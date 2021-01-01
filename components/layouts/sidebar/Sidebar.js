import {Icon, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import Link from "next/link";

export default function Sidebar () {
    return (
        <Menu className={`right-sidebar`} style={{backgroundColor: "#394b59"}}>
            <MenuItem icon={'menu'} text="Навигация" />
            <MenuDivider />
            <MenuItem icon={'search'} text={<Link href="/analyze/position/"><a>Позиция в выдаче</a></Link>} />
            <MenuItem icon={'new-text-box'} text={<Link href="/analyze/competitors/"><a>Поиск конкурентов</a></Link>} />
            <MenuItem icon={'new-object'} text={<Link href="/analyze/indexation/"><a>Проверка индекцации</a></Link>} />
            {/*<Link href="/analyze/position/"> <MenuItem icon={'search'} text="Позиция в выдаче" /> </Link>*/}
            {/*<Link href="/analyze/competitors/"> <MenuItem icon="new-text-box" text="Поиск конкурентов" /> </Link>*/}
            {/*<Link href="/analyze/indexation/"> <MenuItem icon="new-object" text="Проверка индекцации" /> </Link>*/}
            <MenuItem icon="new-link" text="New link" />
            <MenuDivider />
            <MenuItem icon="cog" labelElement={<Icon icon="share" />} text="Settings..." />
        </Menu>
    )
}