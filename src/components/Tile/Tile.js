import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Tile.css';

const Tile = (props) => (
    <article className="CardTile" onClick={props.clicked}>
        <Card className="CardRoot">
				<CardActionArea>
					<CardMedia
                        className="CardMedia"
                        image={props.url}
                        title={props.Name}
					/>
					<CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.Name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.Description}
                        </Typography>
					</CardContent>
				</CardActionArea>
				{/* <CardActions>
					<Button size="small" color="primary">
                        Share
					</Button>
					<Button size="small" color="primary">
                        Learn More
					</Button>
				</CardActions> */}
			</Card>
    </article>
);

export default Tile;