import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
// import {ProductService } from './ProductService';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdminNavbar from "./AdminNavbar";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { ColorModeContext } from '../../Contexts/ColorModeContext';
import { classNames } from 'primereact/utils';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/themes/saga-orange/theme.css";
import "./AdminStyle/UsersData.css"

const drawerWidth = 240;

const UsersData = () => {

  // let emptyProduct = {
  //   code: null,
  //   name: '',
  //   price: 0,
  // };

  const [users, setUsers] = useState(null);
  const dt = useRef(null);
  // const [product, setProduct] = useState(emptyProduct);
  // const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  // const [productDialog, setProductDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lockedUsers, setLockedUsers] = useState([]);

  const lockTemplate = (rowData, options) => {
    const icon = options.frozenRow ? 'pi pi-lock' : 'pi pi-lock-open';
    const disabled = options.frozenRow ? false : lockedUsers.length >= 2;

    return <Button type="button" icon={icon} disabled={disabled} className="p-button-sm p-button-text" onClick={() => toggleLock(rowData, options.frozenRow, options.rowIndex)} />;
  };

  const toggleLock = (data, frozen, index) => {
    let _lockedUsers, _unlockedUsers;

    if (frozen) {
      _lockedUsers = lockedUsers.filter((c, i) => i !== index);
      _unlockedUsers = [...users, data];
    } else {
      _unlockedUsers = users.filter((c, i) => i !== index);
      _lockedUsers = [...lockedUsers, data];
    }

    _unlockedUsers.sort((val1, val2) => {
      return val1.id < val2.id ? -1 : 1;
    });

    setLockedUsers(_lockedUsers);
    setUsers(_unlockedUsers);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // code: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    rname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IS }] },
    // price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });

  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  // const toast = useRef(null);

  const [statuses] = useState(['active', 'inactive']);
  const { toggleMode, mode } = useContext(ColorModeContext)
  const Navigate = useNavigate();

  const IdentifyMode = () => {
    if (mode === 'light') {
      return 'light'
    } else if (mode === 'dark') {
      return 'dark'
    } else if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }

  // const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

  // useEffect(() => {
  //   ProductService.getusersMini().then((data) => setProducts(data));
  //   setLoading(false);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/admin/fetch_users_data'); // Replace '/api/users' with your actual API endpoint
        setUsers(res.data);
        // console.log(res.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);

        const tableNode = document.querySelector('.p-datatable-table .p-datatable-thead'); // Selector for table header
        const tableBodyNode = document.querySelector('.p-datatable-table .p-datatable-tbody'); // Selector for table body

        // Check if both tableNode and tableBodyNode are not null before proceeding
        if (tableNode !== null && tableBodyNode !== null) {
          const exportColumns = [];
          const exportData = [];

          // Extract column headers
          tableNode.querySelectorAll('th').forEach((th) => {
            exportColumns.push({ header: th.innerText });
          });

          // Extract table body data
          tableBodyNode.querySelectorAll('tr').forEach((tr) => {
            const rowData = [];
            tr.querySelectorAll('td').forEach((td) => {
              rowData.push(td.innerText);
            });
            exportData.push(rowData);
          });

          // Generate PDF with column headers and table body data
          doc.autoTable({
            head: [exportColumns.map(col => col.header)],
            body: exportData
          });

          doc.save('users.pdf');
        } else {
          console.error('Table header or body not found in the DOM.');
        }
      });
    });
  };


  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + "...";
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      // Retrieve the table element and extract column headers
      const tableElement = document.querySelector('.p-datatable-table');
      const headerRow = tableElement.querySelector('thead tr');
      const columnHeaders = Array.from(headerRow.querySelectorAll('th')).map(th => th.innerText);

      // Extract data from table rows and columns
      const tableData = [];
      const rows = tableElement.querySelectorAll('tbody tr');
      rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll('td');
        cells.forEach((cell) => {
          rowData.push(cell.innerText);
        });
        tableData.push(rowData);
      });

      // Add column headers as the first row
      tableData.unshift(columnHeaders);

      // Create a new worksheet with the table data
      const worksheet = xlsx.utils.aoa_to_sheet(tableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

      // Convert workbook to Excel buffer and save
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx', // Or 'xlsb' for efficiency
        type: 'array' // Or 'binary'
      });

      saveAsExcelFile(excelBuffer, `users`);
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };


  const onGlobalFilterChange = (e) => {
    const value = e.target ? e.target.value : '';
    let _filters = { ...filters };
    console.log(e);

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // const confirmDeleteProduct = (product) => {
  //   setProduct(product);
  //   setDeleteProductDialog(true);
  // };

  // const actionBodyTemplate = (rowData) => {
  //   return (
  //     <React.Fragment>
  //       <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
  //     </React.Fragment>
  //   );
  // };
  const UsersBodyTemplate = (rowData) => {
    const users = rowData;

    return (
      <div className="flex align-items-center gap-2">
        <Avatar alt={users.name} src={users.profilePic} sx={{ width: 35, height: 35, mr: 0.5, bgcolor: 'orange' }}>
          {!users.profilePic && users.name.charAt(0).toUpperCase()}
        </Avatar>
        <span>{users.name}</span>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>
        </div>
      </>
    );
  };

  const getSeverity = (value) => {
    switch (value) {
      case 'active':
        return 'success';

      case 'inactive':
        return 'danger';

      default:
        return null;
    }
  };

  const onRowEditComplete = async (e) => {
    try {
      const { newData, index } = e;
      const updatedUsers = [...users];
      updatedUsers[index] = newData;
      setUsers(updatedUsers);

      // Send the edited data to the backend
      await axios.put(`/admin/update_user/${newData._id}`, newData);
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const priceEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)}></Tag>;
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
  };

  // const dateFilterTemplate = (options) => {
  //   return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm-dd-yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
  // };

  // const priceBodyTemplate = (rowData) => {
  //   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
  // };

  const allowEdit = (rowData) => {
    return rowData.name !== 'Blue Band';
  };

  // const hideDeleteProductDialog = () => {
  //   setDeleteProductDialog(false);
  // };

  //   const deleteProduct = () => {
  //     let _users = users.filter((val) => val.id !== product.id);

  //     setUsers(_users);
  //     setDeleteProductDialog(false);
  //     setProduct(emptyProduct);
  //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  // };

  //   const deleteProductDialogFooter = (
  //     <React.Fragment>
  //         <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
  //         <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
  //     </React.Fragment>
  // );

  const header = renderHeader();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AdminNavbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
        >
          <Toolbar />
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              onClick={() => Navigate("/Admin/Dashboard")}
              sx={{ cursor: "pointer" }}
            >
              Dashboard
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              onClick={() => Navigate("/Admin/UsersData")}
              aria-current="page"
              sx={{ cursor: "pointer" }}
            >
              Users
            </Link>
          </Breadcrumbs>
          <Typography variant='h5' sx={{ my: 2 }}>
            UsersData
          </Typography>
          <div className="card p-fluid" style={{ fontSize: "initial" }}>
            <Toolbar style={{ padding: 0, minHeight: 0, marginBottom: 10 }}>
              <div className="flex align-items-center justify-content-end gap-2">
                <Button type="button" icon="pi pi-file" style={{ height: "2.8rem" }} onClick={exportCSV} data-pr-tooltip="CSV" size="large" />
                <Button type="button" icon="pi pi-file-excel" style={{ height: "2.8rem" }} severity="success" onClick={exportExcel} data-pr-tooltip="XLS" size="large" />
                <Button type="button" icon="pi pi-file-pdf" style={{ height: "2.8rem" }} severity="warning" onClick={exportPdf} data-pr-tooltip="PDF" size="large" />
              </div>
            </Toolbar>
            <DataTable ref={dt} value={users} editMode="row" frozenValue={lockedUsers} paginator rows={10} removableSort dataKey="id" filters={filters} filterDisplay="row" loading={loading} header={header} emptyMessage="No users found." onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} selectionMode="single" selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value)} >
              <Column field="name" header="Name" sortable sortField="name" filter filterPlaceholder='Search' filterField='name' body={UsersBodyTemplate}
                editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
              <Column field="email" header="Email" sortable sortField="email" filter filterField='email' filterPlaceholder="Search"
                editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
              <Column field="rname" header="Real Name" sortable sortField="rname" filter filterPlaceholder='Search' filterField='rname'
                editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
              <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterField='status' filterElement={statusRowFilterTemplate} editor={(options) => statusEditor(options)} />
              <Column field="createdAt" header='Creation Date' filterField='createdAt' dataType='date' style={{ minWidth: '10rem' }} body={dateBodyTemplate} sortable sortField='createdAt' />
              {/* <Column field="price" header="Price" sortable sortField="price" filter filterField='price' dataType="numeric" filterPlaceholder="Search" body={priceBodyTemplate} editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column> */}
              <Column rowEditor={allowEdit} exportable={false} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
              <Column style={{ flex: '0 0 4rem' }} exportable={false} body={lockTemplate}></Column>
            </DataTable>
          </div>
        </Box>
        {/* <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            {product && (
              <span>
                Are you sure you want to delete <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog> */}
      </Box>
    </>
  )
}

export default UsersData
