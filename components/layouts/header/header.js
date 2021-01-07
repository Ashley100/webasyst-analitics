import React from 'react';
import {Navbar, InputGroup, Icon, Button, AnchorButton, Switch, Popover, Menu, MenuItem} from "@blueprintjs/core";
import styles from './styles/header.module.scss';
import Link from "next/link";

export default function Header () {
    return (
        <header className={styles.header}>

            <Navbar>
                <div className={`container-large`} style={{backgroundColor: "#394b59", display: 'block'}}>
                    <Navbar.Group align={'left'}>
                        <Navbar.Heading>
                            <span style={{fontWeight: '600'}}>
                                <span style={{color: '#000'}}>Web</span>
                                <span style={{color: '#08e'}}>a</span>
                                <span style={{color: '#2c2'}}>s</span>
                                <span style={{color: '#e62'}}>y</span>
                                <span style={{color: '#fc0'}}>s</span>
                                <span style={{color: '#5dd'}}>t</span>
                            </span> Analytics
                        </Navbar.Heading>
                    </Navbar.Group>

                    <Navbar.Group align={'right'}>
                        <InputGroup
                            disabled={false}
                            placeholder="Add people or groups..."
                            leftElement={<Icon icon="search" />}
                            type='search'
                            icon={'search'}
                        />
                        <Navbar.Divider />
                        <Link href="/">
                            <AnchorButton className="bp3-minimal" icon="home" text="Home" />
                        </Link>
                        <Link href="/analyze/">
                            <AnchorButton className="bp3-minimal" icon="chart" text="Analyze" />
                        </Link>


                        <Popover content={ProfilePopup()} target={<Button className="bp3-minimal" icon="user" text="Profile" />} />


                    </Navbar.Group>
                </div>
            </Navbar>

        </header>
    );

    function ProfilePopup () {
        return (
            <Menu>
                <MenuItem text="Submenu">
                    <MenuItem text="Child one" />
                    <MenuItem text="Child two" />
                    <MenuItem text="Child three" />
                </MenuItem>
                    <MenuItem text="Child three" icon={'send-message'} />
                    <MenuItem text="Child three" icon={'layout-hierarchy'}/>
                    <MenuItem text="Logout" icon={'drawer-left-filled'} />
            </Menu>
        )
    }
}