import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
	Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
	Avatar, IconButton, Typography, TextField, BottomNavigation, BottomNavigationAction
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { MoreVert, BookmarkBorder, FavoriteBorder, Restore, Bookmark, Pageview } from '@material-ui/icons';

class recipe extends Component {
	render() {
		const useStyles = makeStyles((theme) => ({
			root: {
				maxWidth: 345,
			},
			media: {
				height: 0,
				paddingTop: '56.25%', // 16:9
			},
			expand: {
				transform: 'rotate(0deg)',
				marginLeft: 'auto',
				transition: theme.transitions.create('transform', {
					duration: theme.transitions.duration.shortest,
				}),
			},
			expandOpen: {
				transform: 'rotate(180deg)',
			},
			avatar: {
				backgroundColor: red[500],
			},
		}));

		// const [value, setValue] = React.useState(0);

		return (
			<div>
				<div>
					<img src="/img/magnifying.png" alt="" width="40px" />
					<TextField id="outlined-basic" variant="outlined" size="small" />
					(엔터 이벤트)<br />
					<Link to="/write">글쓰기</Link><br />
					<Link to="/recipedetail">글상세보기(확인용)</Link>
				</div>
				<div>
					<BottomNavigation
						// value={value}
						// onChange={(event, newValue) => {
						// 	setValue(newValue);
						// }}
						showLabels
					>
						<BottomNavigationAction label="최신순" icon={<Restore />} />
						<BottomNavigationAction label="스크랩순" icon={<Bookmark />} />
						<BottomNavigationAction label="조회순" icon={<Pageview />} />
					</BottomNavigation>
				</div>
				<br />
				<div>
					<Card className={useStyles.root}>
						<CardHeader
							avatar={
								<Avatar aria-label="recipe" className={useStyles.avatar}>
									R
								</Avatar>
							}
							action={
								<IconButton aria-label="settings">
									<MoreVert />
								</IconButton>
							}
							title="제목"
							subheader="날짜"
						/>
						<CardMedia
							className={useStyles.media}
							image="/img/add_icon.png"
							title="Paella dish"
						/>
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								요리 소개
							</Typography>
						</CardContent>
						<CardActions disableSpacing style={{ float: "right" }}>
							<IconButton aria-label="share">
								<span style={{ fontWeight: "200", fontSize: "10pt" }}>스크랩 0개</span>
								&nbsp;
								<BookmarkBorder />
							</IconButton>
						</CardActions>
					</Card>

				</div>
			</div>
		);
	}
}

export default recipe;
