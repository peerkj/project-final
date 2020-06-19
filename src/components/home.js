import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, AppBar, Toolbar, Badge, DialogContent, DialogActions, TextField, DialogTitle } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { Close, AddCircle, ThumbUp } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import { inject, observer } from "mobx-react";
import "../css/home.css";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	badge: {
		height: "40px",
		minWidth: "40px",
		borderRadius: "40px",
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Home = ({
	count,
	addCount,
	resetCount,
	openpot,
	clickPot,
	pot,
	changePot,
	openPot,
	stopPot,
	mylist,
	addPotFood,
	pot_food,
	deleteList,
	c,
	e_add,
	e_store,
	select_delete,
	addopen,
	handleAddFood,
	handleAddOpen,
	available_addfood,
	addFood,
	onChangeFood,
	handleEnter,
	handleListFood,
	refri_delete,
	handleCook,
	handleRecipe,
	refir,
	handle_style,
	r_open,
	r_close,
	refir_style
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		resetCount();
		r_open();
		setOpen(true);
		handleListFood();
	};

	const handleClose = () => {
		setOpen(false);

		r_close();
	};
	const dropped = (e) => {
		e.containerElem.style.visibility = "hidden";
		addPotFood(e.dragData.idx);
		e_add(e);
		openPot();
		addCount();
	};

	const list = mylist.map((my, idx) => {
		return (
			<DragDropContainer
				key={my.refrig_num}
				targetKey="foo"
				dragData={{ idx: idx, key: my.refrig_num, food: my.refrig_name }}
			>
				<img src="/img/orange.png" alt="" />
				<br />
				<b>{my.refrig_name}</b>
				<Close
					id="profileImg_delete"
					onClick={() => {
						refri_delete(my.refrig_num);
					}}
				/>
			</DragDropContainer>
		);
	});
	const pot_list = e_store.map((e) => {
		return (
			<div key={e.dragData.key}>
				<b>{e.dragData.food}</b>
				<Close
					id="profileImg_delete"
					onClick={() => {
						select_delete(e);
					}}
				/>
				<br />
			</div>
		);
	});

	return (
		<div>
			<img
				src="/img/refrigerator.png"
				style={{
					width: "100px",

					position: "absolute",
					left: "280px",
					top: "480px",
				}}
				onClick={handleClickOpen}
				alt=""
			/>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
				style={{ backgroundImage: "url(/img/refrigerator.png)" }}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div>
					<br />
					<br />
					{list}

					<DropTarget targetKey="foo" onHit={dropped}>
						<div>
							<center>
								<img className={refir_style} src={refir} alt="" width="374"
									style={{ marginLeft: "-6px" }} />
								<img className={handle_style} src="img/refview.png" alt="" width="330" />
								<Button
									onClick={handleRecipe}
									size="small"
									startIcon={<ThumbUp />}
									variant="outlined"
									className={handle_style}
								>
									추천 레시피 보기
								</Button>
								&ensp;
								<Button
									variant="outlined"
									size="small"
									startIcon={<AddCircle />}
									onClick={handleAddOpen}
									className={handle_style}
								>재료 추가</Button>
							</center>
						</div>
						<div>
							<center>
								<img
									style={{
										width: "150px",
										marginTop: "60px"
									}}
									src={pot}
									alt=""
									onClick={clickPot}
									className={handle_style}
								/>
							</center>
						</div>
						<div
							style={{
								position: "absolute",
								left: "275px",
								top: "422px",
							}}
						>
							<Badge
								className={useStyles.badge}
								badgeContent={count}
								color="secondary"
							></Badge>
						</div>
					</DropTarget>

				</div>
			</Dialog>

			<Dialog>
				<DialogContent>
					<img
						src={pot}
						alt=""
						style={handle_style}
					/>
					<br />
					{pot_list}
					<Button color="primary" variant="outlined" onClick={deleteList}>
						냄비 비우기
					</Button>
					<Button color="primary" variant="outlined" onClick={handleCook}>
						요리하기
					</Button>
					<br />
				</DialogContent>
			</Dialog>

			<Dialog
				open={addopen}
				onClose={handleAddOpen}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">냉장고 추가</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						label="재료 입력"
						type="test"
						fullWidth
						autoFocus
						onKeyPress={handleEnter}
						value={addFood}
						onChange={onChangeFood}
						error={!(addFood === "") ^ available_addfood}
						helperText={
							available_addfood || addFood === "" ? "" : "한글 1~10자"
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddFood} color="primary">
						추가
					</Button>

					<Button onClick={handleAddOpen} color="primary">
						취소
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default inject(({ drag }) => ({
	count: drag.count,
	resetCount: drag.resetCount,
	addCount: drag.addCount,
	openpot: drag.open,
	clickPot: drag.clickPot,
	pot: drag.pot,
	changePot: drag.changePot,
	openPot: drag.openPot,
	stopPot: drag.stopPot,
	mylist: drag.mylist,
	addPotFood: drag.addPotFood,
	pot_food: drag.pot_food,
	deleteList: drag.deleteList,
	e_add: drag.e_add,
	select_delete: drag.select_delete,
	e_store: drag.e_store,
	addopen: drag.addopen,
	handleAddFood: drag.handleAddFood,
	handleAddOpen: drag.handleAddOpen,
	available_addfood: drag.available_addfood,
	addFood: drag.addFood,
	onChangeFood: drag.onChangeFood,
	handleEnter: drag.handleEnter,
	handleListFood: drag.handleListFood,
	refri_delete: drag.refri_delete,
	handleCook: drag.handleCook,
	handleRecipe: drag.handleRecipe,
	r_open: drag.r_open,
	r_close: drag.r_close,
	handle_style: drag.handle_style,
	refir: drag.refir,
	refir_style: drag.refir_style

}))(observer(Home));
