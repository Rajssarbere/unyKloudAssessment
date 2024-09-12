import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { v4 } from "uuid";

const dashboardData = [
    {
        id: v4(),
        status: "In Progress",
        isCollapse: false,
        tasks: [
            {
                id: v4(),
                task: "Performance test",
            }
        ]
    },
    {
        id: v4(),
        status: "Backlog",
        isCollapse: false,
        tasks: []
    },
    {
        id: v4(),
        status: "Testing",
        isCollapse: false,
        tasks: []
    },
    {
        id: v4(),
        status: "Done",
        isCollapse: false,
        tasks: [
            {
                id: v4(),
                task: "Spreadshit node js",
            }
        ]
    },
]

export const Demo = () => {

    const [state, setState] = useState<any[]>(dashboardData)
    const [open, setOpen] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)

    const [task, setTask] = useState("")
    const [status, setStatus] = useState("")
    const [selectedRow, setSelectedRow] = useState<any>("")

    const [draggedItem, setDraggedItem] = useState(null);

    const handleClick = (el: any, cardState: boolean) => {
        let _state = state.map((it: any) => {
            if (el?.id === it?.id) {
                let obj = {
                    ...it,
                    isCollapse: cardState
                }
                return obj
            } else {
                return it
            }
        })
        setState(_state)
    }

    const handleAddClick = (el: any) => {
        setSelectedRow(el)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setTask("")
        setSelectedRow("")
    }

    const handleStatusClose = () => {
        setOpenStatus(false)
        setStatus("")
    }

    const handleSave = () => {
        let _state = state?.map((el: any) => {
            if (el?.id === selectedRow?.id) {
                let item = {
                    id: v4(),
                    task: task
                }
                let obj = {
                    ...el,
                    tasks: [...(el?.tasks || []), item]
                }
                return obj
            } else {
                return el
            }
        })
        setState(_state)
        handleClose()
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'task') {
            setTask(value);
        }
        if (name === 'status') {
            setStatus(value)
        }
    }

    const handleAddStatus = () => {
        setOpenStatus(true)
    }

    const handleStatusSave = () => {
        let obj = {
            id: v4(),
            status: status,
            isCollapse: false,
            tasks: []
        }
        state.push(obj)
        setState(state)
        handleStatusClose()
    }

    const handleDragStart = (index: any) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e: any, index: any) => {
        e.preventDefault();
        if (draggedItem !== null && draggedItem !== index) {
            const _state = [...state];
            const _draggedItem = _state.splice(draggedItem, 1)[0];
            _state.splice(index, 0, _draggedItem);
            setDraggedItem(index);
            setState(_state);
        }
    };

    const handleDrop = () => {
        setDraggedItem(null);
    };

    return (
        <>
            <Stack spacing={1} direction={"row"} width={'100%'} height={'90vh'}>
                {
                    state.map((it: any) =>
                        <Box display={it?.isCollapse ? '' : 'none'} height={'90%'} border={'1px solid gray'} sx={{ margin: '5px 10px', p: "10px", writingMode: 'vertical-rl' }}>
                            <Stack direction={'row'} sx={{ placeItems: 'center', justifyContent: 'space-between' }}>
                                {it?.status}
                                <IconButton onClick={() => handleClick(it, false)}>
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                            </Stack>
                        </Box>
                    )
                }
                {
                    state?.map((it: any, index: any) =>
                        <Stack direction={'column'} spacing={1}>
                            <Box
                                key={index}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={handleDrop}
                                display={it?.isCollapse ? 'none' : ''} height={'40px'} minWidth={'250px'} width={'auto'} border={'1px solid gray'} sx={{ p: "10px" }}>
                                <Stack direction={'row'} sx={{ placeItems: 'center', justifyContent: 'space-between' }}>
                                    {it?.status}
                                    <Stack direction={'row'}>
                                        <IconButton onClick={() => handleAddClick(it)}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleClick(it, true)}>
                                            <KeyboardArrowRightIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Box>
                            {it?.tasks?.map((el: any) =>
                                <Box display={it?.isCollapse ? 'none' : ''} height={'40px'} border={'1px solid gray'} sx={{ p: "10px" }}>
                                    <Stack direction={'row'} sx={{ placeItems: 'center', justifyContent: 'space-between' }}>
                                        {el?.task}
                                    </Stack>
                                </Box>
                            )}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Add Task"}
                                </DialogTitle>
                                <DialogContent>
                                    <TextField
                                        value={task}
                                        name='task'
                                        onChange={(e: any) => handleChange(e)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={() => handleSave()} autoFocus>
                                        Save
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Stack>
                    )
                }
            </Stack>
            <Stack sx={{ placeItems: 'end' }}>
                <Button onClick={() => handleAddStatus()}>Add Status</Button>
            </Stack>
            <Dialog
                open={openStatus}
                onClose={handleStatusClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add Status"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={status}
                        name='status'
                        onChange={(e: any) => handleChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleStatusClose}>Cancel</Button>
                    <Button onClick={() => handleStatusSave()} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}