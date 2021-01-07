import React from "react";
import { Button, Dialog } from "@blueprintjs/core";
import { PositionHeader } from "./components/position-header";
import PositionForm from "./components/position-form/position-form";


export default function Position () {

    return (
        <div>

            <PositionHeader/>

            <PositionForm/>


            <Dialog
                className={`position__dialog`}
                icon="info-sign"
                onClose={() => {}}
                title="Palantir Foundry"
                isOpen={false}
            >
                <div className={`DIALOG_BODY`}>
                    <p>
                        <strong>
                            Data integration is the seminal problem of the digital age. For over ten years, we’ve
                            helped the world’s premier organizations rise to the challenge.
                        </strong>
                    </p>
                </div>
                <div className={`DIALOG_FOOTER`}>
                    <div className={`DIALOG_FOOTER_ACTIONS`}>

                        <Button onClick={() => {}}>Close</Button>

                    </div>
                </div>
            </Dialog>

        </div>
    )
}