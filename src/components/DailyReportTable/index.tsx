

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from "store/hooks";
import { createdReport } from "store/modules/report/selectors";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { deleteReportAPI } from 'hooks/reports';
import { getreporting } from "store/modules/report";
import  AsyncLocalStorage  from "@createnextapp/async-local-storage";
import { updatedReportAPI } from 'hooks/reports'
import  {useFormik} from "formik";
import {UpdatedReport} from "../../store/modules/report/types";
import { Modal, Form, Container, Button}  from 'react-bootstrap';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: "#934036",
      border: "1px solid #ab9c5b"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "1px solid #ab9c5b"
    },
}));
  

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
  
  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
 
  
  function CustomPaginationActionsTable() {

    const addedReport = useAppSelector(createdReport);
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [reportName, setReportName] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [dataid, setDataid] = React.useState("");
    const [datacontent, setDatacontent] = React.useState("");
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - addedReport?.length) : 0;
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const init = async () => {
        const user = await AsyncLocalStorage.getItem("username"); 
        setReportName(user);
        return user
    }

    const handleDelete = async (_id: string) => {
        await deleteReportAPI(_id).then((res:any) => {
            init().then((username: string) =>
                dispatch(getreporting(username))
            );
        })
    };

    
    const handleClose = () => setShow(false);
    const handleShow = (data: any) => {setShow(true); setDataid(data._id); setDatacontent(data.content);} 
    console.log(datacontent)

    const initialValues = {
        _id: "",
        content: "",  
        updatedAt: ""
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values, actions) => {
          const d = new Date().toLocaleDateString(); 
          values.updatedAt = d;
          values._id = dataid;
       
          updatedReportAPI(values).then((res:any) => {
            init().then((username: string) =>
                dispatch(getreporting(username))
            );
        });
    
          actions.resetForm({ values: initialValues });
        },
    });

  
    return (
      <TableContainer component={Paper}>
        <Table className='borderTable' sx={{ Width: 500 }} aria-label="custom pagination table" >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Content</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? addedReport.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : addedReport
            ).map((row:any, key: any) => (
              <TableRow key={key} style={{border: "1px solid #ab9c5b"}}>
                <StyledTableCell component="th" scope="row">
                  {row?.name}
                </StyledTableCell>
                <StyledTableCell style={{ maxWidth: 120,whiteSpace: "nowrap",textOverflow: "ellipsis",overflow: "hidden" }} align="left">
                  {row?.content}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }} align="left">
                  {row?.createdAt}
                </StyledTableCell>
                < StyledTableCell style={{ textAlign:"center"}}>
                  <BsFillTrashFill onClick={() => handleDelete(row?._id)}  style={{color:"red"}}/>
                  <BsPencilFill onClick={() => handleShow(row)} style={{color:"blue"}}/>
                </StyledTableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows,border: "1px solid #ab9c5b" }}>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow style={{border: "1px solid #ab9c5b"}}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={addedReport?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                style={{border: "1px solid #ab9c5b"}}
              />
            </TableRow>
          </TableFooter>
          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={formik.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Overwrite</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group
                    className="mb-3"
                  >
                    <Form.Label>Quickly!</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      type="text"
                      name="content"
                      id="content"
                      defaultValue={datacontent}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="secondary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Table>
      </TableContainer>
      
    );
  }

  export default CustomPaginationActionsTable;