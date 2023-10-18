"use client"
import { Paper, Typography, Stack, Box, Tooltip, IconButton} from "@mui/material"
import CodeIcon from '@mui/icons-material/Code';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import { GroupProps } from "./types";

import EditIcon from '@mui/icons-material/Edit';

Chart.register(ArcElement);

export default function Group({title, members, moneySpent, data}:GroupProps) {
    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart:any, args:any, pluginOptions:any) {
            const {ctx, data} = chart

            ctx.save();
            ctx.font = '20px sans-serif'
            ctx.fillStyle = 'rgba(255,255,255,0.4)'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(`${data.datasets[0].data[0]}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
        }
    }

    return (
        <Paper elevation={8} sx={{
            width:'250px',
            height: '200px',
            borderRadius: '20px',
            bgcolor: '#102A43',
            padding: '10px'
        }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Box sx={{
                    display: 'flex',
                    bgcolor: '#111823',
                    borderRadius: '50%',
                    minWidth: '2.5rem',
                    minHeight: '2.5rem',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                        <CodeIcon sx={{color: 'white'}}/>
                </Box>
                <Typography variant='h5' color='white' paddingLeft='10px' fontWeight='bold'>{title}</Typography>
                <Tooltip title="Edit">
                    <IconButton sx={{color: 'white'}} href="#">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack gap={0}>
                        <Typography color="white" fontWeight={'bold'} textAlign={'center'}>
                            <span>{members.toString()} </span> 
                            wizeliners
                        </Typography>
                        <Box>
                            <Typography fontWeight={'bold'} textAlign={'center'} fontSize={'23px'}>
                                <span>${moneySpent.toString()} USD</span>
                            </Typography>
                            <Typography sx={{color: 'rgba(255,255,255,0.4)', textAlign:'center'}}>This month</Typography>
                        </Box>
                    </Stack>
                    <Box width={'100px'} margin={'auto'}>
                        <Doughnut data={data} plugins={[textCenter]}/>
                        <Typography sx={{paddingTop:'10px', color: 'rgba(255,255,255,0.4)'}}>Tokens Used</Typography>
                    </Box>
            </Stack>
        </Paper>
    )
}