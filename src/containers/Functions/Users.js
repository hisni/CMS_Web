import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Users.css';
// import AUX from '../../hoc/Auxiliary/Auxiliary';
import UserLayout from '../Profile/UserLayout';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles(theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(2.5),
	},
}));

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	table: {
		minWidth: 500,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});	

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	function handleFirstPageButtonClick(event) {
		onChangePage(event, 0);
	}

	function handleBackButtonClick(event) {
		onChangePage(event, page - 1);
	}

	function handleNextButtonClick(event) {
		onChangePage(event, page + 1);
	}

	function handleLastPageButtonClick(event) {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	}

	return (
		<div className={classes.root}>
		<IconButton
			onClick={handleFirstPageButtonClick}
			disabled={page === 0}
			aria-label="first page"
		>
			{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
		</IconButton>
		<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
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
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};


class Profile extends Component {

    state = {
        Data:null,
        page:0,
		rowsPerPage:5,
    }

    componentDidMount(){
        // this.props.onTryAutoSignup();

        const tokenData = {
            token: this.props.token
        };

        axios.get( 'test/users',tokenData )
        .then( response => {
            const fetchedPosts = [];
            for(let key in response.data.result){
                fetchedPosts.push({
                    ...response.data.result[key],
                    id: key
                });
            }
            this.setState({Data: fetchedPosts});
            console.log(this.state.Data);
        } );
    }

    handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
	}

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
		this.setState({ page: 0 });
    }
    
    render(){
		var rows = [];
        if( this.state.Data ){
            this.state.Data.map(post => {
                rows.push({
                    ID: post.id,
                    FN: post.first_name,
                    LN: post.last_name,
                    EM: post.email,
                    CC: post.country_code
                });
                return null;
            });
		}
		
		const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);

		const classes = this.props;

		console.log(this.props);

		return (
			<UserLayout>
				<Paper className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Country Code</TableCell>
                                <TableCell align="right">Change Role</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => (
							<TableRow key={row.TT}>
								<TableCell component="th" scope="row">{row.FN}</TableCell>
								<TableCell align="right">{row.LN}</TableCell>
								<TableCell align="right">{row.EM}</TableCell>
								<TableCell align="right">{row.CC}</TableCell>
                                <TableCell align="right"><a href="/change">Change</a></TableCell>
							</TableRow>
							))}

							{emptyRows > 0 && (
							<TableRow style={{ height: 48 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								colSpan={3}
								count={rows.length}
								rowsPerPage={this.state.rowsPerPage}
								page={this.state.page}
								SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
								}}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
							</TableRow>
						</TableFooter>
						</Table>
					</div>
				</Paper>
			</UserLayout>
		);
	}
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Profile));
// export default connect(mapStateToProps)(Profile);

// var data = [];
    
//         if( this.state.Data ){
//             this.state.Data.map(post => {
//                 data.push({
//                     ID: post.id,
//                     FN: post.first_name,
//                     LN: post.last_name,
//                     EM: post.email,
//                     CC: post.country_code
//                     // Humidity: post.Humidity,
//                     // stab: post.Stability
//                 });
//                 return null;
//             });
//         }

//         data = data.slice(-25);

//         console.log(data);

//         var tableData = (
//             data.map(TD => (
//                 <tr>
//                     <td>{TD.ID}</td>
//                     <td>{TD.FN}</td>
//                     <td>{TD.LN}</td>
//                     <td>{TD.EM}</td>
//                     <td>{TD.CC}</td>
//                 </tr>
//             ))
//         );

//         return(
//             <AUX>
//                 <UserLayout>
//                     <div className="TrackBg" >
//                         <div className="Title">
//                             <h1>Users</h1>                    
//                         </div>
//                         <div className="Main">
//                             <div className="Search">
//                                 <label for="sc">Search: </label>
//                                 <input type="search" id="gsearch" name="dc"/> 
//                             </div>
//                             <table id="Tdata">
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>First Name</th>
//                                     <th>Last Name</th>
//                                     <th>Email</th>
//                                     <th>Country Code</th>
//                                 </tr>
//                                 {tableData}
//                             </table>
//                         </div>
//                     </div>
//                 </UserLayout>
//             </AUX>
//         );