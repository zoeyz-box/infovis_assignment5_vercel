function Points(props) {
    const {data, xScale, yScale, height, width, selectedStation, onMouseOver, onMouseOut} = props;

    // helper functions
    const getColor = (selectedStation, station) => {
        return selectedStation == station ? 'red' : 'steelblue';
    }
    const getRadius = (selectedStation, station) => {
        return selectedStation == station ? 10 : 5;
    }

    // mouse event handlers that pass event and data
    const handleMouseOver = (station, event, dataPoint) => {
        onMouseOver(station, event, dataPoint);
    }
    const handleMouseOut = () => {
        onMouseOut();
    }
    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
        {// yellow rectangle overlay when a pt is selected
            selectedStation && (
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="yellow"
                    opacity={0.5}
                />
            )
        }
        {// draw all circles
            data.map((d, i) => (
                <circle
                    key={`circle-${i}`}
                    cx={xScale(d.start)}
                    cy={yScale(d.end)}
                    r={getRadius(selectedStation, d.station)}
                    fill={getColor(selectedStation, d.station)}
                    opacity={0.8}
                    onMouseOver={(event) => handleMouseOver(d.station, event, d)}
                    onMouseOut={handleMouseOut}
                />
            ))
        }
        {// draw selected circle again to bring it to the front
            selectedStation && data.filter(d => d.station == selectedStation).map((d, i) => (
                <circle
                    key={`circle-${i}`}
                    cx={xScale(d.start)}
                    cy={yScale(d.end)}
                    r={getRadius(selectedStation, d.station)}
                    fill={getColor(selectedStation, d.station)}
                    opacity={0.8}
                    onMouseOver={(event) => handleMouseOver(d.station, event, d)}
                    onMouseOut={handleMouseOut}
                />
            ))
        }
        </g>
    } else {
        return <g></g>
    }
}

export default Points