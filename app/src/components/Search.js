import React from 'react'
import {Navbar, Container} from 'react-bootstrap'
import '../css/Search.css'

const Search = ({search,searchInput,handleSearch}) => {

    return (

        <div>
            <Navbar>
                <Container className='container-search'>
                    <input value={search} ref={searchInput} onChange={handleSearch} type='search' className='input-search' placeholder='Users names....' />
                </Container>
            </Navbar>
        </div>
    )
}

export default Search;