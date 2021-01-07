import React, {useState} from "react";
import {Icon, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import Link from "next/link";

export default function Sidebar () {

    const [links, setLinks] = useState([
        { id: "1", href: "/analyze/siteinfo", active: false, tagName: "a", icon: "info-sign", text: "Информация о сайте" },
        { id: "2", href: "/analyze/position", active: false, tagName: "a", icon: "numbered-list", text: "Позиция в выдаче" },
        { id: "3", href: "/analyze/competitors", active: false, tagName: "a", icon: "comparison", text: "Поиск конкурентов" },
        { id: "4", href: "/analyze/indexation", active: false, tagName: "a", icon: "path-search", text: "Проверка индекцации" },
        { id: "5", href: "/analyze/todolist", active: false, tagName: "a", icon: "add-to-artifact", text: "Todo list" },
    ]);

    function onClickMenuItem (link) {
        let updatedLinks = links.map(l => {
           l.active = link.id === l.id;
           return l
        });
        setLinks(updatedLinks);
    };

    return (
        <Menu className={`right-sidebar`} style={{backgroundColor: "#394b59"}}>
            <MenuItem tagName={'div'} icon={'menu'} text="Навигация" />
            <MenuDivider />

            {links.map(link => {
                return (
                    <Link href={link.href} key={link.id}>
                        <MenuItem
                            tagName={link.tagName}
                            active={link.active}
                            icon={link.icon}
                            text={link.text}
                            onClick={() => onClickMenuItem(link)}
                        />
                    </Link>
                )
            })}

            {/*<Link href="/analyze/siteinfo/">*/}
            {/*    <MenuItem tagName={'a'} icon={'info-sign'} text={'Информация о сайте'} />*/}
            {/*</Link>*/}
            {/*<Link href="/analyze/position/">*/}
            {/*    <MenuItem tagName={'a'} icon={'numbered-list'} text={'Позиция в выдаче'} />*/}
            {/*</Link>*/}
            {/*<Link href="/analyze/competitors/">*/}
            {/*    <MenuItem tagName={'a'} icon={'comparison'} text={'Поиск конкурентов'} />*/}
            {/*</Link>*/}
            {/*<Link href="/analyze/indexation/">*/}
            {/*    <MenuItem tagName={'a'} icon={'path-search'} text={'Проверка индекцации'} />*/}
            {/*</Link>*/}
            {/*<Link href="/analyze/todolist/">*/}
            {/*    <MenuItem tagName={'a'} icon={'add-to-artifact'} text={'Todo list'} />*/}
            {/*</Link>*/}
            <MenuDivider />
            <MenuItem tagName={'a'} icon="cog" labelElement={<Icon icon="share" />} text="Settings..." />
        </Menu>
    )
}