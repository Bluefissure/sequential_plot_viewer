import React  from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const DataTable = (props) => {
    const columns = [
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'TYPE',
            filterable: true,
            accessor: 'type'
        },
        {
            Header: 'DRINK',
            filterable: true,
            accessor: 'drink'
        },
        {
            Header: 'SYMPTOMS',
            filterable: true,
            accessor: 'symptoms'
        },
        {
            Header: 'MEETINGS',
            filterable: true,
            accessor: 'meetings'
        },
        {
            Header: 'PLOT',
            filterable: true,
            accessor: 'plot'
        },
        {
            Header: 'SUPPORT',
            accessor: 'support'
        },
        {
            Header: 'View',
            accessor: 'view'
        },
    ];
    // console.log(props.overview);

    return (<ReactTable data={props.overview} columns={columns} />);
}

export default DataTable;