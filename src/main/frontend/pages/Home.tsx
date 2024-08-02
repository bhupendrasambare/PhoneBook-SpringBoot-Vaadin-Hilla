import NavbarComponent from 'Frontend/components/Navbar'
import React, { useEffect, useState } from 'react'
import Contact from "generated/com/phone/book/entity/Contact"
import Respons from "generated/com/phone/book/dto/response/Response"
import Status from "generated/com/phone/book/dto/Status"
import { ContactService } from 'Frontend/generated/endpoints';
import { useSelector } from 'react-redux';
import { RootState } from 'Frontend/storage'
import { Pagination, Table } from 'react-bootstrap'
import CreateContact from 'Frontend/components/CreateContact'

interface PaginatedTableProps {
  data: Contact[];
  itemsPerPage: number;
}

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const token:string|null = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchContacts = async () => {
          try {
            if(token!=null){
              const response:Contact[] = await ContactService.getContacts(token);
              setContacts(response);
              console.log(contacts);
            }
          } catch (error) {
            console.error("Error fetching books:", error);
          }
        };
    
        fetchContacts();
    }, []);

    const totalPages = Math.ceil(contacts.length / 10);

    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const currentData = contacts.slice(
      (currentPage - 1) * 10,
      currentPage * 10
    );

    return ( 
        <div className='home-page'>
            <NavbarComponent/>

            <div className='container my-5'>
            <CreateContact/>
                <div className="bg-dark bg-opacity-25 bg-gradient rounded-5 p-3">
                    <Table striped hover className='rounded-5 mh-50vh'>
                        <thead className=''>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </div>
    )
}

export default Home