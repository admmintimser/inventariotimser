import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Divider, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import "../assets/HomePage.scss";

const drawerWidth = 240;
const minimizedDrawerWidth = 60;

const Sidebar = () => {
    const location = useLocation();
    const [isMinimized, setIsMinimized] = React.useState(false);
    
    const toggleDrawer = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isMinimized ? minimizedDrawerWidth : drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: isMinimized ? minimizedDrawerWidth : drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar>
                <IconButton onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                {!isMinimized && (
                    <Typography variant="h6" noWrap>
                        Timser Group
                    </Typography>
                )}
            </Toolbar>
            <Divider />
            <List>
            <ListItem button component={Link} to="/inventario" selected={location.pathname.startsWith('/inventario')}>
    <ListItemIcon>
        <InventoryIcon color={location.pathname.startsWith('/inventario') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Inventario" />}
</ListItem>

<ListItem button component={Link} to="/producto" selected={location.pathname.startsWith('/producto')}>
    <ListItemIcon>
        <CategoryIcon color={location.pathname.startsWith('/producto') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Productos" />}
</ListItem>

<ListItem button component={Link} to="/entrada" selected={location.pathname.startsWith('/entrada')}>
    <ListItemIcon>
        <LocalShippingIcon color={location.pathname.startsWith('/entrada') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Entrada" />}
</ListItem>

<ListItem button component={Link} to="/salida" selected={location.pathname.startsWith('/salida')}>
    <ListItemIcon>
        <ShoppingCartIcon color={location.pathname.startsWith('/salida') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Salida" />}
</ListItem>

<ListItem button component={Link} to="/requisicion-salida" selected={location.pathname.startsWith('/requisicion-salida')}>
    <ListItemIcon>
        <ReceiptIcon color={location.pathname.startsWith('/requisicion-salida') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Requisición Salida" />}
</ListItem>

<ListItem button component={Link} to="/requisicion-compra" selected={location.pathname.startsWith('/requisicion-compra')}>
    <ListItemIcon>
        <AddShoppingCartIcon color={location.pathname.startsWith('/requisicion-compra') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Requisición Compra" />}
</ListItem>

<ListItem button component={Link} to="/proveedor" selected={location.pathname.startsWith('/proveedor')}>
    <ListItemIcon>
        <BusinessIcon color={location.pathname.startsWith('/proveedor') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Proveedores" />}
</ListItem>

<ListItem button component={Link} to="/ubicacion" selected={location.pathname.startsWith('/ubicacion')}>
    <ListItemIcon>
        <StoreIcon color={location.pathname.startsWith('/ubicacion') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Ubicaciones" />}
</ListItem>

<ListItem button component={Link} to="/destinos" selected={location.pathname.startsWith('/destinos')}>
    <ListItemIcon>
        <AddLocationAltIcon color={location.pathname.startsWith('/destinos') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Destinos" />}
</ListItem>

<ListItem button component={Link} to="/dashboard" selected={location.pathname.startsWith('/dashboard')}>
    <ListItemIcon>
        <DashboardIcon color={location.pathname.startsWith('/dashboard') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Dashboard" />}
</ListItem>

<ListItem button component={Link} to="/profile" selected={location.pathname.startsWith('/profile')}>
    <ListItemIcon>
        <AccountCircleOutlinedIcon color={location.pathname.startsWith('/profile') ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Perfil" />}
</ListItem>

<ListItem button component={Link} to="/logout" selected={location.pathname === "/logout"}>
    <ListItemIcon>
        <ExitToAppIcon color={location.pathname === "/logout" ? 'primary' : 'inherit'} />
    </ListItemIcon>
    {!isMinimized && <ListItemText primary="Cerrar Sesión" />}
</ListItem>

            </List>
        </Drawer>
    );
};

export default Sidebar;
