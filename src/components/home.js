import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, AppBar, Toolbar, Badge, DialogContent, DialogActions, TextField, DialogTitle, Slide, IconButton, InputAdornment, FormControl, InputLabel, Input } from "@material-ui/core";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { Close, AddCircle, ThumbUp, RestaurantMenu, DeleteOutline, Search } from "@material-ui/icons";
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
	margin: {
		margin: theme.spacing(1),
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
	refir_style,
	binpot,
	handleKeyPress,
	//handleSearchRecipe
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
				<img src="/img/pot/dish.png" alt="" width="100px"
					style={{ marginTop: "-15px" }}></img>
				<span style={{
					position: "absolute", top: "28px", left: "32px"
				}}>{my.refrig_name}</span>
				<Close
					id="profileImg_delete"
					onClick={
						() => {
							refri_delete(my.refrig_num);
						}}
					style={{
						marginLeft: "-25px"
					}}
				/>
			</DragDropContainer>
		);
	});
	const pot_list = e_store.map((e) => {
		return (
			<div key={e.dragData.key} style={{}}>
				<span
					style={{ fontSize: "10pt", fontWeight: "400" }}
				>{e.dragData.food}</span>
				<Close
					id="profileImg_delete"
					onClick={() => {
						select_delete(e);
					}}
					style={{ position: "relative", top: "-1px", left: "1px", fontSize: "12pt" }}
				/>
			</div>
		);
	});

	return (
		<div width="375px">
			<center>
				<FormControl className={classes.margin} style={{ marginTop: "230px" }}>
					{/* <InputLabel htmlFor="input-with-icon-adornment">재료 검색 시 예)#삼겹살</InputLabel> */}
					<Input
						id="input-with-icon-adornment"
						startAdornment={
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						}
						onKeyPress={handleKeyPress}
					/>
				</FormControl>
			</center>
			<span style={{
				fontSize: "12pt",
				fontWeight: "300",
				position: "absolute",
				top: "600px",
				left: "170px"
			}}>나만의 냉장고</span>
			<img
				src="/img/refrigerator.png"
				style={{
					width: "200px",
					position: "absolute",
					left: "210px",
					top: "480px",
				}}
				onClick={handleClickOpen}
				alt=""
			/>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
			// TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar} style={{ height: "50px", backgroundColor: "#002060" }}>
					<Toolbar >
						<IconButton
							edge="start"
							onClick={handleClose}
							aria-label="close"
						>
							<Close style={{ color: "#ffffff", marginTop: "-5px" }} />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div>
					<br />
					<div style={{ width: "375px" }}>
						<center>
							<div className={handle_style}>
								<Button
									onClick={handleRecipe}
									size="small"
									startIcon={<ThumbUp />}
									variant="outlined"
								>
									추천 레시피 보기
								</Button>
								<br /><br />
								<div onClick={handleAddOpen}>
									<AddCircle style={{ fontSize: "10pt" }} />
									<span>재료 추가</span>
								</div>
							</div>
							<img className={refir_style} src={refir} alt="" width="530"
								style={{ marginLeft: "-77px" }} />
							<div className={handle_style} width="330">
								<img src="img/refview2.png" alt="" width="330" />
								<span style={{
									position: "absolute",
									top: "155px",
									left: "0px",
									width: "370px",
									height: "320px"
								}}>{list}</span>
							</div>
						</center>
					</div>
					<DropTarget targetKey="foo" onHit={dropped}>
						<div className={handle_style}>
							<center style={{ width: "375px" }}>
								<span>재료를 드래그하여 냄비에 넣어 주세요.</span>
								<br />
								<img
									style={{
										width: "150px"
									}}
									src={pot}
									alt=""
									onClick={clickPot}
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
								style={{ top: "85px", left: "-10px" }}
							></Badge>
						</div>
					</DropTarget>

				</div>
			</Dialog>

			<Dialog open={binpot} onClose={clickPot}
				style={{ position: "absolute", top: "35px", left: "7px" }}>
				<DialogContent>
					<Close
						onClick={clickPot}
						style={{ float: "right" }} />
					<br />
					<center>
						<img
							src="img/pot/boiledpot.gif"
							alt=""
							width="250px"
						/>
						<br />
						<div style={{
							width: "200px",
							height: "180px",
							border: "1px solid #c5c5c5",
							borderRadius: "10px",
							marginBottom: "10px",
							padding: "1px"
						}}>{pot_list}</div>
						<Button
							size="small"
							variant="outlined"
							onClick={deleteList}
							startIcon={<DeleteOutline />}
						>
							비우기
						</Button>
						&ensp;
						<Button
							size="small"
							variant="outlined"
							startIcon={<RestaurantMenu />}
							onClick={handleCook}>
							요리하기
						</Button>
					</center>
					<br />
				</DialogContent>
			</Dialog>

			<Dialog
				open={addopen}
				onClose={handleAddOpen}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">냉장고 재료 추가</DialogTitle>
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
	refir_style: drag.refir_style,
	binpot: drag.binpot,
	handleKeyPress: drag.handleKeyPress,
	//handleSearchRecipe: drag, handleSearchRecipe

}))(observer(Home));
