
  import { useEffect, useRef, useState } from 'react';
  import { InputText } from 'primereact/inputtext';
  import userServices from '../services/userService';
  import Navbar from './Navbar';
  import ReactPaginate from 'react-paginate';
  import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
  import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog metho
  import { Toast } from 'primereact/toast';
          


  export default function TableUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 6;

    const toast = useRef(null);


      const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have acceaccpted',life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', position:"top-center", life: 3000 });
    }

    const confirmDelete = (id) => {
      confirmDialog({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptClassName: 'p-button-danger',
          accept: () => handleDelete(id),
          reject,
          
      });
  };




    const handlePageChange = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
    };
    

    async function fetchData() {
      const res = await userServices.getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    }


    useEffect(() => {
      
      fetchData();
      setLoading(false);
    }, []);

    const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      setGlobalFilterValue(value);

      if (value) {
        const filteredData = users.filter((user) => {
          return (
            user.fName.toLowerCase().includes(value.toLowerCase()) ||
            user.lName.toLowerCase().includes(value.toLowerCase()) ||
            user.uName.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase()) ||
            user.role.toLowerCase().includes(value.toLowerCase())
          );
        });
        setFilteredUsers(filteredData);
      } else {
        setFilteredUsers(users);
      }
    };

    const handleReload = async () => {
      const res = await userServices.getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
      setGlobalFilterValue('');
    };


    const handleDelete = async (id) => {
      await userServices.deleteUser(id);
      const res = await userServices.getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    };

    const renderHeader = () => {
      return (
              <div  className="header">
                  <div>

                  <i className="pi pi-refresh pi-outlined " style={{margin:"0px 20px 0 0 ",border:"1px solid #ced4da", padding:"0.7rem",borderRadius:"15px",fontSize: "1rem", cursor: "pointer"}}  onClick={handleReload}   />

                  <i className="pi pi-plus pi-outlined " style={{margin:"0px 25px 0 0 ",border:"1px solid #ced4da", padding:"0.7rem",borderRadius:"15px",fontSize: "1rem", cursor: "pointer"}}  />
                  
                  </div>
                  <span class="search-container">
                      

                      <div style={{ position: 'relative' }}>
                      <input type="text" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" icon="pi pi-search"style={{borderRadius: "15px",border:"1px solid #ced4da",marginRight:"50px",padding:"0.5rem 0.5rem",marginRight: "50px"}}/>
                      <i className="pi pi-search" style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)',marginRight:"44px" }}></i>
                      </div>
                  </span>
                
                
              </div>
          );
      };

    return (
      <>
      <Navbar/>
      <Toast ref={toast} />
       <ConfirmDialog />
      <div className="card">
    {renderHeader()}
    <div className="wrapper">
      <table className="table">
        <thead className="thed">
          <tr>
            <th style={{ minWidth: "12rem", padding: "15px" }}>First Name</th>
            <th style={{ minWidth: "12rem", padding: "15px" }}>Last Name</th>
            <th style={{ minWidth: "12rem", padding: "15px" }}>Username</th>
            <th style={{ minWidth: "12rem", padding: "15px" }}>Email</th>
            <th style={{ minWidth: "12rem", padding: "15px" }}>Role</th>
            <th style={{ minWidth: "12rem", padding: "15px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((user) => (
              <tr className="rows" key={user.id}>
                <td style={{ padding: "14px" }}>{user.fName}</td>
                <td style={{ padding: "14px" }}>{user.lName}</td>
                <td style={{ padding: "14px" }}>{user.uName}</td>
                <td style={{ padding: "14px" }}>{user.email}</td>
                <td style={{ padding: "14px" }}>{user.role}</td>
                <td style={{ padding: "14px" }}>
                  <i
                    className="pi pi-eye"
                    style={{
                      color: "#708090",
                      marginRight: "15px",
                      tabSize: "18px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  ></i>
                  <i
                    className="pi pi-trash"
                    style={{
                      color: "#708090",
                      marginRight: "15px",
                      tabSize: "18px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => confirmDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate 
        pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-link"
        disabledClassName="disabled"

        
      />
    </div>
  </div>

      </>
    );
  }


