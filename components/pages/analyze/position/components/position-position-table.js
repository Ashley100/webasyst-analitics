import React from 'react';

export default function PositionTable ({tableInfo}) {

    console.log('PositionTable', tableInfo);

    function parsedImage (screenShot) {
        if (screenShot) return (
            <img src={`data:image/jpeg;base64,${screenShot}`} style={{width: '100px'}}/>
        )
    }

    return (
        <>
            <table className="bp3-html-table modifier block-dark w-full mb-24">
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
                    <td>{tableInfo.result.searchSystem}</td>
                    <td>{tableInfo.result.position}</td>
                    <td>{tableInfo.result.page}</td>
                    <td>{parsedImage(tableInfo.result.screenShot)}</td>
                </tr>
                </tbody>
            </table>

            {/*<pre style={{maxWidth: '600px', overflow: 'hidden'}}>*/}
            {/*  {JSON.stringify(tableInfo.findSite, false, 4)}*/}
            {/*</pre>*/}
        </>
    )
};
