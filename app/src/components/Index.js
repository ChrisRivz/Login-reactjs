import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Container, Button, ButtonGroup, Pagination } from 'react-bootstrap'
import Header from './Header'
import Search from '../components/Search'
import CardUsers from '../components/CardUsers'
import ListUsers from '../components/ListUsers'
import ThemeContext from '../context/ThemeContext'
import '../css/Index.css'


function Index() {

    const [themecontext, setContext] = useState(ThemeContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [listusers, setUsers] = useState([])
    const [boolCard, setBoolCard] = useState(true);
    const [usersessionData, setUserdata] = useState({})
    const searchInput = useRef(null)
    useEffect(() => {
        if (localStorage.length === 0) {
            window.open("/", '_self');
        }
        else {
            fetch('https://reqres.in/api/users?page=2')
                .then(response => response.json())
                .then(function (data) {

                    let obj = JSON.parse(localStorage.getItem("currentUser"))
                    setUserdata(obj);
                    setUsers(data.data);
                    
                })
        }
    }, [])
    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])
    const filteredUsers = useMemo(() =>
        listusers.filter((data) => {
            return data.first_name.toLowerCase().includes(search.toLowerCase());
        }),
        [listusers, search]
    )
    const handleClick_Card = () => {
        setBoolCard(!boolCard);
    }
    let LIMIT = 3;
    const currentData = filteredUsers.slice(
        (currentPage - 1) * LIMIT,
        (currentPage - 1) * LIMIT + LIMIT
    );
    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    }
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    }

    return (

        <ThemeContext.Provider value={[themecontext, setContext]}>
            <div className={themecontext ? "" : "dark"}>
                <Header usersessionData={usersessionData}/>
                <Container className={themecontext ? "container-index" : "container-index dark"}>
                    <ButtonGroup aria-label="Basic example">
                        <Button className="btn-group" variant="secondary" onClick={handleClick_Card}>
                            {
                                boolCard ? "List" : "Card"
                            }
                        </Button>
                    </ButtonGroup>
                    <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
                    {
                        boolCard
                            ?
                            <CardUsers filteredUsers={currentData} themecontext={themecontext} />
                            :
                            <ListUsers filteredUsers={currentData} themecontext={themecontext} />
                    }
                    <Pagination className="pagination">
                        {
                            currentPage !== 1 ? <Pagination.Prev onClick={handlePrev}>Preview</Pagination.Prev> : null
                        }
                        {
                            currentPage * LIMIT / currentData.length <= 1 ? <Pagination.Next onClick={handleNext}>Next</Pagination.Next> : null
                        }
                    </Pagination>
                </Container>

            </div>

        </ThemeContext.Provider>
    )
}

export default Index;