import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
import UserLayout from '../Profile/UserLayout';

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

class Page extends Component {

	state = {
		Data:null,
		page:0,
		rowsPerPage:5,
	}
	
	
	componentDidMount(){
        const tokenData = {
            token: this.props.token
        };

        axios.get( 'test/conferences',tokenData )
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

	createData = (name, calories, fat) => {
		return { name, calories, fat };
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
                    TT: post.title,
                    DE: post.description,
                    DA: post.date,
                    VN: post.venue,
                    ST: post.total_seats,
                    AS: post.available_seats
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
								<TableCell>Title</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Date</TableCell>
								<TableCell align="right">Venue</TableCell>
								<TableCell align="right">Total Seats</TableCell>
								<TableCell align="right">Available Seats</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => (
							<TableRow key={row.TT}>
								<TableCell component="th" scope="row">
								{row.TT}
								</TableCell>
								<TableCell align="right">{row.DE}</TableCell>
								<TableCell align="right">{row.DA}</TableCell>
								<TableCell align="right">{row.VN}</TableCell>
								<TableCell align="right">{row.ST}</TableCell>
								<TableCell align="right">{row.AS}</TableCell>
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

export default withStyles(styles)(connect(mapStateToProps)(Page));