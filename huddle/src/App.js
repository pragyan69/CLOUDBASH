// App.js

import React from 'react';
import HuddleRoom from './components/HuddleRoom';
import { HuddleProvider, HuddleClient } from '@huddle01/react';

const huddleClient = new HuddleClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // ensure you have this variable in your environment
    options: {
        activeSpeakers: {
            size: 8,
        },
    },
});

const App = () => {
    return (
        <HuddleProvider client={huddleClient}>
            <div className="App">
                <HuddleRoom roomId="pia-mswj-xbf" token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tSWQiOiJwaWEtbXN3ai14YmYiLCJyb2xlIjoiaG9zdCIsInBlcm1pc3Npb25zIjp7ImFkbWluIjp0cnVlLCJjYW5Db25zdW1lIjp0cnVlLCJjYW5Qcm9kdWNlIjp0cnVlLCJjYW5Qcm9kdWNlU291cmNlcyI6eyJjYW0iOnRydWUsIm1pYyI6dHJ1ZSwic2NyZWVuIjp0cnVlfSwiY2FuU2VuZERhdGEiOnRydWUsImNhblJlY3ZEYXRhIjp0cnVlLCJjYW5VcGRhdGVNZXRhZGF0YSI6dHJ1ZX0sIm1ldGFkYXRhIjoie1wid2FsbGV0QWRkcmVzc1wiOlwiMHhmN2VENUFFZDgzOTIxRTFlMWUxOWFkYjUwNjk1NGJFMDMxRDBFNGIzXCJ9IiwicGVlcklkIjoicGVlcklkLWE0T1RlZHl1V2U3c3BzaFdkS0RPWSIsInB1cnBvc2UiOiJTREsiLCJyb29tSW5mbyI6eyJyb29tTG9ja2VkIjpmYWxzZSwibXV0ZU9uRW50cnkiOmZhbHNlLCJyb29tVHlwZSI6IlZJREVPIiwidmlkZW9PbkVudHJ5IjpmYWxzZX0sImlhdCI6MTcwMjA3MzU2MSwiZXhwIjoxNzAyMDg0MzYxLCJpc3MiOiJodWRkbGUwMSJ9.ncxPMVETO__X-7WKMCa9gQURmJ4kwcs31C82anoQYvQLNsKLSKGmzEu5vJMWLbmye8ay_yf7U7H2LafeDUVoKnUBiimkJQLX9Cpv-dyDYGFMzYP4f3-CIB0iX92Be2_GdCRkekm8pFRH5aoqog4nRJqENkhodJy9RWT9oAr0CQLLMjXvMD7JQrBPjNdMhrF0rImgKm89zMywZsFAMxVwR1cyc-jJ6HIT8ZhWdSsNQRpSsiKWAHRYwiNa1mFTe4E1DWJM3yE_r-gVsLsK2CAlpeThVd5TjznVD_8W8RAogImUvKDTOeyN9m5sBnUD0GgeCdQwXyeZ3hg9bW0KFF_0A3HzplP_CZ-1bhPCglGf_WTG4I9w4wn5evFsx8O62IukhBjJzMPwU7CtC0Evd0HGP6e3fcirH3-H4tdx4TWhTdUOCWNlG1O_-4UPi7AbApgQ8M3uSKYXkmLwkOTKG9JhoczGS-8JhWQLckig8wXkMyGHJAJCGalTNM0KL4TnKWjUjuii2p5S07o2_1US7YvP3l_zrkaW0rQUuqWG0tE_KdIONIva3ViPXrZFeB2j-IMtcZqqbUnrIn1GAlXRbTik4MnhspgJMciWTGlWdURjph_l_09wbpA_8r7n2Yr9AEbxpgMwoNUQ7gkC3RonSmJA8xiZKJMPiZqzX1J3E64_584" onJoinSuccess={() => console.log('Successfully joined!')} />
                {/* other components */}
            </div>
        </HuddleProvider>
    );
};

export default App;
