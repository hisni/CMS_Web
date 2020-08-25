import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
// import axios from 'axios';

import './Schedule.css';

class Schedule extends Component {

	state = {

	}

	componentDidMount() {

    }

    render() {
        return (
			<div className="PageSCH">
				<div>
					<h1 className="T2" >Program Schedule</h1>
				</div>
                <div className="TableStyle">
                <Table fixed>
                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>08:30 am - 9:00 am</Table.Cell>
                        <Table.Cell>Commencement of ICDM 2020</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>09:00 am - 9:45 am</Table.Cell>
                        <Table.Cell>Keynote Speech I</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>09:45 am - 10:15 am</Table.Cell>
                        <Table.Cell>Keynote Speech II</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>10:15 am - 12:00 pm</Table.Cell>
                        <Table.Cell>Session 1: Electronic System</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>12:00 pm - 12:45 pm</Table.Cell>
                        <Table.Cell>Break</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>12:45 pm - 02:00 pm</Table.Cell>
                        <Table.Cell>Session 2: Manufacturing and Designing</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>02:00 pm - 02:30 pm</Table.Cell>
                        <Table.Cell>Keynote Speech III</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>02:30 pm - 03:30 pm</Table.Cell>
                        <Table.Cell>Session 3: Mechanical Engineering</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>03:30 pm - 04:00 pm</Table.Cell>
                        <Table.Cell>Coffee Break and Poster Session</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>04:00 pm - 04:30 pm</Table.Cell>
                        <Table.Cell>Awards Ceremony and the Conclusion of ICDM 2020</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
                </div>
			</div>
        );
    }
}

export default Schedule;

// import React from 'react'
// import { Table } from 'semantic-ui-react'

// const TableExampleFixed = () => (
//   <Table fixed>
//     <Table.Header>
//       <Table.Row>
//         <Table.HeaderCell>Name</Table.HeaderCell>
//         <Table.HeaderCell>Status</Table.HeaderCell>
//         <Table.HeaderCell>Description</Table.HeaderCell>
//       </Table.Row>
//     </Table.Header>

//     <Table.Body>
//       <Table.Row>
//         <Table.Cell>John</Table.Cell>
//         <Table.Cell>Approved</Table.Cell>
//         <Table.Cell>
//           John is an interesting boy but sometimes you don't really have enough
//           room to describe everything you'd like
//         </Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <Table.Cell>Jamie</Table.Cell>
//         <Table.Cell>Approved</Table.Cell>
//         <Table.Cell>
//           Jamie is a kind girl but sometimes you don't really have enough room
//           to describe everything you'd like
//         </Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <Table.Cell>Jill</Table.Cell>
//         <Table.Cell>Denied</Table.Cell>
//         <Table.Cell>
//           Jill is an alright girl but sometimes you don't really have enough
//           room to describe everything you'd like
//         </Table.Cell>
//       </Table.Row>
//     </Table.Body>
//   </Table>
// )

// export default TableExampleFixed
