import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from "@mui/material/Container";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {TextField, Button} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    // @ts-ignore
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// eslint-disable-next-line react/prop-types
export default function Orders({selectedItem}) {
    const [title, setTitle] = useState(selectedItem?.item?.title);
    const [content, setContent] = useState(selectedItem?.item?.content);
    const [openSave, setOpenSave] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // @ts-ignore
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/note/api/note/notes/', {
                title,
                content,
            });
            console.log(response.data);
            setTitle('');
            setContent('');
            setOpenSave(true);
        } catch (error) {
            console.error(error);
        }
    };

    // @ts-ignore
    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/note/api/note/notes/${dataItem?.item?.id}/`, {
                title,
                content,
            });
            console.log(response.data);
            setOpenEdit(true);
        } catch (error) {
            console.error(error);
        }
    };

    // @ts-ignore
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/note/api/note/notes/${dataItem?.item?.id}/`);
            console.log(response.data);
            setOpenDelete(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSave(false);
        setOpenEdit(false);
        setOpenDelete(false);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <React.Fragment>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>
            <Container maxWidth="lg" sx={{ p: 0, width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        defaultValue={selectedItem?.item?.title}
                        value={title}
                        placeholder="Titulo"
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 5 }}
                    />
                    <TextField
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Nota"
                        multiline
                        fullWidth
                        sx={{
                            height: 'calc(85vh - 200px)',
                            overflowY: 'auto',
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        {dataItem?.isSelected && (
                            <Button  variant="contained" color="error" startIcon={<DeleteIcon  />} onClick={handleDelete}>
                                Eliminar
                            </Button>
                        )}
                        <Button variant="contained" startIcon={<SaveIcon />} type="submit">
                            Guardar
                        </Button>
                        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleEdit}>
                            Editar
                        </Button>
                    </Box>
                </form>
            </Container>
            <Snackbar open={openSave} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Nota guardada con éxito!
                </Alert>
            </Snackbar>
            <Snackbar open={openEdit} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Nota editada con éxito!
                </Alert>
            </Snackbar>
            <Snackbar open={openDelete} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Nota eliminada con éxito!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}