import {useState, useEffect, useRef} from "react";
import {Button, Checkbox, Icon, InputGroup, Spinner} from "@blueprintjs/core";
import axios from "axios";

export default function PositionForm () {

    let [data, setData] = useState({});

    let [searchText, setSearchText] = useState('');
    let [searchSystem, setSearchSystem] = useState({google: true, yandex: false});
    let [searchRegion, setSearchRegion] = useState('');
    let [searchIsFetching, setSearchFetching] = useState(false);

    let searchTextRef = useRef('');


    async function findSite () {
        setSearchFetching(true);
        setData({});

        await axios.post('/api/hello/', {
            data: {
                text: searchText,
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
                setSearchFetching(false);
            });

        // http://geohelper.info/api/v1/regions?apiKey=6y2JS3TLz8HUwYB68oiEybrePYz7vvwf&locale%5Blang%5D=ru&locale%5BfallbackLang%5D=ru
        await axios.get('http://geohelper.info/api/v1/regions?apiKey=6y2JS3TLz8HUwYB68oiEybrePYz7vvwf&locale%5Blang%5D=ru&locale%5BfallbackLang%5D=ru&pagination%5Blimit%5D=100&pagination%5Bpage%5D=1')
            .then(function (response) {
                // handle success
                console.log(response);

            })
    }


    return (
        <>
            <InputGroup
                disabled={false}
                placeholder="example: ip.ru"
                leftElement={<Icon icon="search" />}
                type='search'
                icon={'search'}
                id={'search'}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <div className="df ai-c jc-sb mt-12">
                <div>
                    <strong className="db mb-6">Поисковая система:</strong>
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
                </div>
                <div>
                    <Button icon="search" intent="primary" text="Search" onClick={findSite} />
                </div>
            </div>


            {searchIsFetching && <Spinner intent={'primary'} size={50} />}
        </>
    )
}