import {useState, default as React} from "react";
import { Checkbox, Spinner } from "@blueprintjs/core";
import {PositionFormRegions} from "./regions/position-form-regions";

import axios from "axios";
import {PositionFormSearch} from "./search/position-form-search";
import {PositionFormKeywords} from "./keywords/position-form-keywords";

const PositionTable = React.lazy(() => import('../position-position-table'));

export default function PositionForm () {

    let [data, setData] = useState({});

    let [isFormReady, setFormReady] = useState(false);
    let [searchText, setSearchText] = useState('');
    let [searchSystem, setSearchSystem] = useState({ google: true, yandex: false });
    let [searchRegion, setSearchRegion] = useState('');
    let [searchKeywords, setSearchKeywords] = useState([]);
    let [searchIsFetching, setSearchFetching] = useState(false);


    async function findSite () {
        setSearchFetching(true);
        setData({});

        console.log(searchKeywords);

        await axios.post('/api/hello/', {
            data: {
                text: searchText,
                searchSite: searchText,
                searchSystem: searchSystem,
                searchLocation: { country: {}, region: searchRegion, city: {} },
                searchKeywords: searchKeywords
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
        // await axios.get('http://geohelper.info/api/v1/regions?apiKey=6y2JS3TLz8HUwYB68oiEybrePYz7vvwf&locale%5Blang%5D=ru&locale%5BfallbackLang%5D=ru&pagination%5Blimit%5D=100&pagination%5Bpage%5D=1')
        //     .then(function (response) {
        //         // handle success
        //         console.log(response);
        //
        //     })
    }

    const onChangeSearchSystem = (system) => {
        system === 'google'
            ? setSearchSystem({ google: !searchSystem.google, yandex: searchSystem.yandex })
            : setSearchSystem({ google: searchSystem.google, yandex: !searchSystem.yandex });
    };

    const renderLoader = () => <p>Loading</p>;

    const parsedTable = (data) => {

        console.log(Object.values(data.parse.google));

        if (Object.keys(data.parse.google).length !== 0) {
            if (data.parse.google) {

                return (
                    <React.Suspense fallback={renderLoader()}>
                        {Object.values(data.parse.google).map((el, i) => <PositionTable key={i} tableInfo={el} />)}
                    </React.Suspense>
                )
                    //
            }
        } else {
            return (
                <h3>Google placeholder</h3>
            )
        }
    };






    return (
        <div className="position__form w-full">

            <PositionFormSearch
                searchText={searchText}
                setSearchText={setSearchText}
                onSubmit={findSite}
                isFormReady={isFormReady}
                setFormReady={setFormReady}
            />

            <div className="df ai-c jc-sb mt-12 mb-48">
                <div className="w-full">

                    <div className="dg g-col-3 g-g-24 w-full">
                        <div>
                            <strong className="db mb-18">Поисковая система:</strong>
                            <Checkbox className="df ai-c mr-18" checked={searchSystem.google} onChange={() => onChangeSearchSystem('google')}>
                                <img src="https://image.flaticon.com/icons/png/512/281/281764.png" style={{width: '16px', marginRight: '8px'}}/>
                                Google
                            </Checkbox>
                            <Checkbox className="df ai-c" checked={searchSystem.yandex} onChange={() => onChangeSearchSystem('yandex')}>
                                <img src="https://image.flaticon.com/icons/png/512/226/226266.png" style={{width: '16px', marginRight: '8px'}}/>
                                Yandex
                            </Checkbox>
                        </div>

                        <div>
                            <strong className="db mb-18">Выберите регион:</strong>
                            <PositionFormRegions searchRegion={searchRegion} setSearchRegion={setSearchRegion} />
                        </div>

                        <div>
                            <strong className="db mb-18">По ключевым словам:</strong>
                            <PositionFormKeywords searchKeywords={searchKeywords} setSearchKeywords={setSearchKeywords}/>
                        </div>
                    </div>
                </div>
            </div>


            {searchIsFetching && <Spinner intent={'primary'} size={50} />}


            {Object.keys(data).length !== 0 ? parsedTable(data) : ''}

        </div>
    )
}