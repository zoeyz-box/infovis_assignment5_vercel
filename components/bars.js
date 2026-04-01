function Bars(props) {
    const {data, xScale, yScale, height, selectedStation, onMouseOver, onMouseOut} = props;

    // helper function
    const getColor = (selectedStation, station) => {
        return selectedStation == station ? 'red' : 'steelblue';
    }

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
            {// pay attention to the height of the bars, it should be height-yScale(d.start)}
            data.map((d, i) => (
                <rect
                    key={i}
                    x={xScale(d.station)}
                    y={yScale(d.start)}
                    width={xScale.bandwidth()}
                    height={height - yScale(d.start)}
                    fill={getColor(selectedStation, d.station)}
                    onMouseOver={() => handleMouseOver(d.station)}
                    onMouseOut={handleMouseOut}
                />
            ))}
            </g>
    } else {
        return <g></g>
    }
}

export default Bars