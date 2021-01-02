import {Button, Checkbox, Dialog, Icon, InputGroup, Spinner} from "@blueprintjs/core";
import axios from "axios";
import {useEffect, useState} from "react";
import PositionHeader from "./components/position-header";
import PositionForm from "./components/position-form";
import PositionTable from "./components/position-position-table";

export default function Position () {
    const [data, setData] = useState( {data: 'asd'} );
    const [isFetching, setFetching] = useState( false );
    const [text, setText] = useState('');

    const [inDialog, toggleDialog] = useState(false);


    useEffect( async ()=> {
        // findSite();
    }, []);

    async function findSite () {
        setFetching(true);
        setData({});

        await axios.post('/api/hello/', {
            data: {
                text: text,
            }
        })
            .then(function (response) {
                // handle success
                console.log(response);

                setData(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                setFetching(false);
            });
    }

    function parsedImage (data) {
        if (data) {
            if (data.parse) {
                if (data.parse.result.screenShot) return (<img src={`data:image/jpeg;base64,${data.parse.result.screenShot}`} style={{width: '100px'}}/>)
            }
        }
    }
    function parsedTable (data) {
        if (data) {
            if (data.parse) {
                return (
                    <table className="bp3-html-table modifier block-dark">
                        <thead>
                            <tr>
                                <th>Search system</th>
                                <th>Position</th>
                                <th>Page</th>
                                <th>Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.parse.result.searchSystem}</td>
                                <td>{data.parse.result.position}</td>
                                <td>{data.parse.result.page}</td>
                                <td>{parsedImage(data)}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        }
    }

    return (
        <div>

            <PositionHeader/>

            <PositionForm/>

            <PositionTable />

            <InputGroup
                disabled={false}
                placeholder="example: ip.ru"
                leftElement={<Icon icon="search" />}
                type='search'
                icon={'search'}
                id={'search'}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="df ai-c">
                <Checkbox className="df ai-c mr-18" checked={true} onChange={() => {}}>
                    <img src="https://image.flaticon.com/icons/png/512/281/281764.png" style={{width: '16px', marginRight: '8px'}}/>
                    Google
                </Checkbox>
                <Checkbox className="df ai-c" checked={false} onChange={() => {}}>
                    <img src="https://image.flaticon.com/icons/png/512/226/226266.png" style={{width: '16px', marginRight: '8px'}}/>
                    Yandex
                </Checkbox>
            </div>

            <Button icon="refresh" intent="primary" text="Find" onClick={findSite} />
            {isFetching && <Spinner intent={'primary'} size={50} />}


            {parsedTable(data)}


            {/*{data.parse.result.screenShot && <img src={`data:image/jpeg;base64,${data.parse.result.screenShot}`} style={{width: '200px'}}/>}*/}

            <pre style={{maxWidth: '300px'}}>
              {JSON.stringify(data, false, 4)}
            </pre>




            <Dialog
                className={`position__dialog`}
                icon="info-sign"
                onClose={() => {}}
                title="Palantir Foundry"
                isOpen={inDialog}
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