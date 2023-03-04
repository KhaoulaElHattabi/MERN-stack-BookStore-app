import { useEffect, useRef, useState } from 'react';
  import { InputText } from 'primereact/inputtext';
  import userServices from '../services/userService';
  import Navbar from './Navbar';
  import ReactPaginate from 'react-paginate';
  import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
  import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog metho
  import { Toast } from 'primereact/toast';
  import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import FormUser from './FormUser';


  export default function TableUsers() {
    async function handleCountChange() {
      
      setVisible(!visible);
      handleReload()
    }
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const navig = useNavigate();
    const [chosen, setChosen] = useState("");



    //delete confirm dialog
    const handleDelete = async (id) => {
      await userServices.deleteUser(id);
      const res = await userServices.getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    };

    const toast = useRef(null);


      const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have acceaccpted',life: 3000 });
    }
   /*  const go= ()=>{
      navig("/user-add")
    } */

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', position:"top-center", life: 3000 });
    }
    const header = (
      
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginLeft: '20px', marginRight: '20px' }}>
  <div style={{ width: '60px', height: '60px', borderRadius: '40%', overflow: 'hidden', marginRight: '20px' }}>
    <img src={chosen.image} style={{ width: '100%', height: '100%' }} />
  </div>
  <div style={{ display: 'block' }}>
    <p className="m-0" style={{  fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>{chosen.uName}</p>
    <p className="m-0" style={{  fontSize: '1rem', fontWeight: 'normal', marginLeft: '20px' }}>{chosen.role}</p>
  </div>
</div>




  );

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


    //pagination
    const itemsPerPage = 6;

    const handlePageChange = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
    };
    


      //Filters
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

    //reload
    const handleReload = async () => {
      setLoading(true);
      const res = await userServices.getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
      setGlobalFilterValue('');
      setLoading(false);
    };

   

    async function fetchData() {
      const res = await userServices.getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    }

    useEffect(() => {
      setLoading(true);
      fetchData();
      setLoading(false);
    }, []);

    async function getUser(id)
    {
      const resul = await userServices.getUserById(id)
      console.log(resul.data)
      setChosen(resul.data)
      

    }



    const renderHeader = () => {
      return (
              <div  className="header">
                  <div>

                  <i className="pi pi-refresh pi-outlined " style={{margin:"0px 20px 0 0 ",border:"1px solid #ced4da", padding:"0.7rem",borderRadius:"15px",fontSize: "1rem", cursor: "pointer"}}  onClick={handleReload}   />

                  <i className="pi pi-plus pi-outlined " style={{margin:"0px 25px 0 0 ",border:"1px solid #ced4da", padding:"0.7rem",borderRadius:"15px",fontSize: "1rem", cursor: "pointer"}} onClick={() => setVisible(true)} />
                  
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
      <div className="card flex justify-content-center" >
            
            <Dialog header="Add User" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <FormUser isToggled={visible} toggle={handleCountChange}></FormUser>
            </Dialog>
            <Dialog header="User Information" visible={visible1} style={{ width: '50vw' }} onHide={() => setVisible1(false)}>
            
            <Card header={header}  className="md:w-25rem" style={{ margin: 'auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, marginRight: '20px' }}>
    <p className="m-0" style={{ fontSize: '1rem', fontWeight: 'bold' }}>First Name : {chosen.fName}</p>
    <p className="m-0" style={{ fontSize: '1rem', fontWeight: 'normal' }}>Last Name : {chosen.lName}</p>
    <p className="m-0" style={{ fontSize: '1rem', fontWeight: 'lighter' }}>Email : {chosen.email}</p>
  </div>
  <div style={{ width: '100px', height: '100px', borderRadius: '40%', overflow: 'hidden',marginLeft:'50px' }}>
    <img src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" style={{ width: '100%', height: '100%' }} />
  </div>
</div>
  </div>
</Card>

     
            </Dialog>
        </div>
      <Navbar/>
      <Toast ref={toast} />
       <ConfirmDialog />

       {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ProgressSpinner style={{ width: '50px', height: '50px' }} />
      </div>
    ) :
      <div className="card">
    {renderHeader()}
    <div className="wrapper" style={{ marginLeft: '15px',marginRight: '15px' }}>
      <table className="table">
        <thead className="thed">
        <tr>
        <th style={{ minWidth: "12rem", padding: "15px" }}></th>
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
            <td style={{ padding: "14px" }}>
  <div style={{ width: "50px", height: "50px", borderRadius: "40%", overflow: "hidden" }}>
    <img src={user.image} alt={user.fName} style={{ width: "100%", height: "100%" }} />
  </div>
</td>

            <td style={{ padding: "14px" }}>{user.fName}</td>
            <td style={{ padding: "14px" }}>{user.lName}</td>
            <td style={{ padding: "14px" }}>{user.uName}</td>
            <td style={{ padding: "14px" }}>{user.email}</td>
            <td style={{ padding: "14px" }}>{user.role}</td>
            
            <td style={{ padding: "14px" }}>
                <i
                    className="pi pi-pencil"
                    style={{
                      color: "#708090",
                      marginRight: "8px",
                      tabSize: "18px",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                   
                  />
                  <i
                    className="pi pi-eye"
                    style={{
                      color: "#708090",
                      marginRight: "8px",
                      tabSize: "18px",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      getUser(user._id)
                      setVisible1(true);
                     
                    }}
                    
                  ></i>
                  <i
                    className="pi pi-trash"
                    style={{
                      color: "#708090",
                      marginRight: "8px",
                      tabSize: "18px",
                      fontSize: "18px",
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
  }
      </>
    );
  }

