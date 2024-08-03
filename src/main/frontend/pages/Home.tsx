import NavbarComponent from 'Frontend/components/Navbar'
import React, { useEffect, useState } from 'react'
import Contact from "generated/com/phone/book/entity/Contact"
import UserIcon from "../assets/images/users-icon.png"
import { ContactService } from 'Frontend/generated/endpoints';
import { useSelector } from 'react-redux';
import { RootState } from 'Frontend/storage'
import { Form, Pagination, Table } from 'react-bootstrap'
import CreateContact from 'Frontend/components/CreateContact'
import { FaRegUserCircle } from 'react-icons/fa'

interface PaginatedTableProps {
  data: Contact[];
  itemsPerPage: number;
}

function Home() {
    const [pageSize, setPageSize] = useState(5);
    const [changeNumber, setChangeNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const token:string|null = useSelector((state: RootState) => state.auth.token);
    const totalPages = Math.ceil(contacts.length / pageSize);

    useEffect(() => {
        fetchContacts();
    }, [changeNumber]);

    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize]);

    const fetchContacts = async () => {
        try {
          if(token!=null){
            const response:Contact[] = await ContactService.getContacts(token);
            setContacts(response);
          }
        } catch (error) {
          console.error("Error fetching books:", error);
        }
    };

    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const currentData = contacts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    return ( 
        <div className='home-page'>
            <NavbarComponent/>

            <div className='container my-5'>
                <CreateContact changeNumber={changeNumber} onChangeNumber={setChangeNumber}/>
                <div className="table-responsive">
                    <Table hover  className='transparent-table rounded-3 my-2 mh-50vh rounded-table table-dark'  style={{borderRadius: '5px'}}>
                        <thead className=''>
                        <tr>
                            <th className="fixed-column"></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                            <td><img src={UserIcon} height={25} alt="Example" className="example-image" /></td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="pages">
                        <Form.Select
                            aria-label="Default select example"
                            value={pageSize} // Set the value to match the pageSize state
                            onChange={(event) => {
                                if (event.target) {
                                  setPageSize(Number(event.target.value));
                                }
                              }}>
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={20}>20</option>
                        </Form.Select>
                    </div>
                    <div className="pagination">
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
            </div>
        </div>
    )
}

export default Home