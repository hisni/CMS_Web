import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './ReviewPaper.css';
import AUX from '../../hoc/Auxiliary/Auxiliary';
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

class ReviewPaper extends Component {

    state = {
        Data:null,
        page:0,
		rowsPerPage:10,
    }

    componentDidMount(){
        // this.props.onTryAutoSignup();

        // const tokenData = {
        //     token: this.props.token
        // };

        axios.get( 'submissions/latest' )
        .then( response => {
            
            const fetchedPosts = [];
            for(let key in response.data.result){
                fetchedPosts.push({
                    ...response.data.result[key],
                });
            }
            this.setState({Data: fetchedPosts});
            
        }).catch(err => {
            console.log(err);
        });
    }

    handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
	}

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
		this.setState({ page: 0 });
    }
    
    clickedHandler = (id)=>{
		let path = '/dashboard/review/'+id
		this.props.history.push({pathname: path});
	}

    render() {

        var rows = [];
    
        if( this.state.Data ){
            this.state.Data.map(post => {
                rows.push({
                    ID: post.id,
                    UID: post.user_id,
                    SID: post.subject_id,
                    TT: post.title,
                    SS: post.status,
                    FF: post.file,
                });
                return null;
            });
        }

        console.log(this.state.Data);

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);

        const classes = this.props;

        return(
            <AUX>
                <UserLayout>
                    
                    <div className="Title">
                        <h1>Review Papers</h1>                    
                    </div>
                    <div className="RPTable">
                        <Paper className={classes.root}>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User ID</TableCell>
                                        <TableCell align="right">Subject ID</TableCell>
                                        <TableCell align="right">Title</TableCell>
                                        <TableCell align="right">Review</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => (
                                    <TableRow key={row.ID}>
                                        <TableCell component="th" scope="row">{row.UID}</TableCell>
                                        <TableCell align="right">{row.SID}</TableCell>
                                        <TableCell align="right">{row.TT}</TableCell>
                                        <TableCell align="right">
										<article onClick={() => this.clickedHandler(row.ID)}>
											<p className="changeClick" >Review</p>
										</article>	
									</TableCell>
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
                                        rowsPerPageOptions={[10, 20, 50]}
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
                    </div>
                </UserLayout>
            </AUX>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}

export default withStyles(styles)(connect(mapStateToProps)(ReviewPaper));
