import { useState, useEffect } from 'react';  
import styled from 'styled-components';  

const GridContainer = styled.div`  
  display: grid;  
  grid-template-columns: repeat(${(props) => props.gridWidth}, 30px);  
  grid-template-rows: repeat(${(props) => props.gridHeight}, 30px);  
`;  

const GridItem = styled.div`  
  width: 30px;  
  height: 30px;  
  background-color: ${(props) => (props.isLetter ? props.color : '#000')};  
  border: 1px solid #ccc;  
`;  

const letterPatterns = {  
  A: [  
    '0 1 1 1 0',  
    '1 0 0 0 1',  
    '1 1 1 1 1',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
  ],  
  B: [  
    '1 1 1 1',  
    '1 0 0 1',  
    '1 1 1 0',  
    '1 0 0 1',  
    '1 1 1 1',  
  ],  
  C: [  
    '0 1 1 1',  
    '1 0 0 0',  
    '1 0 0 0',  
    '1 0 0 0',  
    '0 1 1 1',  
  ],  
  D: [  
    '1 1 1 1 0',  
    '0 1 0 0 1',  
    '0 1 0 0 1' ,  
    '0 1 0 0 1',  
    '1 1 1 1 0',  
  ],  
  E: [  
    '1 1 1 1 1',  
    '1 0 0 0 0',  
    '1 1 1 1 1',  
    '1 0 0 0 0',  
    '1 1 1 1 1',  
  ],  
  F: [  
    '1 1 1 1 1',  
    '1 0 0 0 0',  
    '1 1 1 1 1',  
    '1 0 0 0 0',  
    '1 0 0 0 0',  
  ],  
  G: [  
    '0 1 1 1 1',  
    '1 0 0 0 0',  
    '1 0 1 1 1',  
    '1 0 0 0 1',  
    '0 1 1 1 1',  
  ],  
  H: [  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '1 1 1 1 1',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
  ],  
  I: [  
    '1 1 1 1 1',  
    '0 0 1 0 0',  
    '0 0 1 0 0',  
    '0 0 1 0 0',  
    '1 1 1 1 1',  
  ],  
  J: [  
    '1 1 1 1 1',  
    '0 0 0 0 1',  
    '0 0 0 0 1',  
    '1 0 0 0 1',  
    '0 1 1 1 0',  
  ],  
  K: [  
    '1 0 0 0 1',  
    '1 0 1 0 0',  
    '1 1 0 0 0',  
    '1 0 1 0 0',  
    '1 0 0 0 1',  
  ],  
  L: [  
    '1 0 0 0 0',  
    '1 0 0 0 0',  
    '1 0 0 0 0',  
    '1 0 0 0 0',  
    '1 1 1 1 1',  
  ],  
  M: [  
    '1 0 0 0 1',  
    '1 1 0 1 1',  
    '1 0 1 0 1',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
  ],  
  N: [  
    '1 0 0 0 1',  
    '1 1 0 0 1',  
    '1 0 1 0 1',  
    '1 0 0 1 1',  
    '1 0 0 0 1',  
  ],  
  O: [  
    '0 1 1 1 0',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '0 1 1 1 0',  
  ],  
  P: [  
    '1 1 1 1 0',  
    '1 0 0 0 1',  
    '1 1 1 1 0',  
    '1 0 0 0 0',  
    '1 0 0 0 0',  
  ],  
  Q: [  
    '0 1 1 1 0',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '1 0 0 1 0',  
    '0 1 1 1 1',  
  ],  
  R: [  
    '1 1 1 1 0',  
    '1 0 0 0 1',  
    '1 1 1 1 0',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
  ],  
  S: [  
    '0 1 1 1 1',  
    '1 0 0 0 0',  
    '0 1 1 1 0',  
    '0 0 0 0 1',  
    '1 1 1 1 0',  
  ],  
  T: [  
    '1 1 1 1 1',  
    '0 0 1 0 0',  
    '0 0 1 0 0',  
    '0 0 1 0 0',  
    '0 0 1 0 0',  
  ],  
  U: [  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '0 1 1 1 0',  
  ],  
  V: [  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '0 1 0 1 0',  
    '0 0 1 0 0',  
  ],  
  W: [  
    '1 0 0 0 1',  
    '1 0 0 0 1',  
    '1 0 1 0 1',  
    '1 1 0 1 1',  
    '1 0 0 0 1',  
  ],  
  X: [  
    '1 0 0 0 1',  
    '0 1 0 1 0',  
    '0 0 1 0 0',  
    '0 1 0 1 0',  
    '1 0 0 0 1',  
  ],  
  Y: [  
    '1 0 0 0 1',  
    '0 1 0 1 0',  
    '0 0 1 0 0',  
    '0 0 1 0 0',  
    '0 0 1 0 0',  
  ],  
  Z: [  
    '1 1 1 1 1',  
    '0 0 0 1 0',  
    '0 0 1 0 0',  
    '0 1 0 0 0',  
    '1 1 1 1 1',  
  ] 
  }
const PatternDisplay= () => {  
  const [gridWidth, setGridWidth] = useState(20);  
  const [gridHeight, setGridHeight] = useState(15);  
  const [letterHeight, setLetterHeight] = useState(5);  
  const [grid, setGrid] = useState([]);  
  const [letterPosition, setLetterPosition] = useState(0);  
  const [textColor, setTextColor] = useState('#ffffff');  
  
  const [movingWord, setMovingWord] = useState("Welcome!"); // Initial moving word  

  const initializeGrid = (width, height) => {  
    return Array(height).fill(null).map(() => Array(width).fill(false));  
  };  

  useEffect(() => {  
    setGrid(initializeGrid(gridWidth, gridHeight));  
  }, [gridWidth, gridHeight]);  

  useEffect(() => {  
    const moveLetters = () => {  
      const newGrid = initializeGrid(gridWidth, gridHeight);  
      const totalEmptyRows = gridHeight - letterHeight;  
      const topEmptyRows = Math.floor(totalEmptyRows / 2);  

      movingWord.split('').forEach((letter, index) => {  
        const letterPattern = letterPatterns[letter.toUpperCase()] || letterPatterns[' '];  

        const offset = letterPosition + index * 6; // Spacing between letters  

        if (offset >= 0 && offset < gridWidth) {  
          letterPattern.forEach((row, rowIndex) => {  
            row.split(' ').forEach((cell, colIndex) => {  
              if (cell === '1') {  
                const gridColumnPosition = offset + colIndex;  
                const gridRowPosition = topEmptyRows + rowIndex;  
                if (  
                  gridColumnPosition >= 0 &&  
                  gridColumnPosition < gridWidth &&  
                  gridRowPosition >= 0 &&  
                  gridRowPosition < gridHeight  
                ) {  
                  newGrid[gridRowPosition][gridColumnPosition] = true;  
                }  
              }  
            });  
          });  
        }  
      });  

      setGrid(newGrid);  
      setLetterPosition((prevPos) => (prevPos + 1 >= gridWidth + movingWord.length * 6 ? -6 : prevPos + 1));  
    };  

    const interval = setInterval(moveLetters, 300);  
    return () => clearInterval(interval);  
  }, [letterPosition, gridWidth, gridHeight, letterHeight, movingWord]);  

  // Color changing effect  
  useEffect(() => {  
    const colorInterval = setInterval(() => {  
      setTextColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);  
    }, 2000);  

    return () => clearInterval(colorInterval);  
  }, []);  

  return (  
  <> 
  
  <div>
      <h1 className=' text-red-600 text-[50px]  mb-30 font-bold font-poppins'>Welcome To Pattern Display Game!</h1>
      <h3 className=' text-red-800 text-[20px] font-semibold'>You can write any pattern that you want to display on the screen.</h3>
  </div>
  
  <div className=' w-[90%] h-15 flex items-center justify-around mt-5 mb-12 bg-blue-500 rounded'> 
    <div className='flex items-center justify-center'>
      <label className ='block text-black text-[20px] font-semibold m-3'>
        Column: 
      </label>
        <input  
          type="number"  
          min="10"  
          value={gridWidth}  
          onChange={(e) => setGridWidth(Number(e.target.value))}  
          placeholder="Enter Column Number."  
          className='shadow appearance-none border rounded w-[100px] py-1 px-5 text-gray-400 leading-tight focus:outline-none focus:shadow-outline'
        /> 
    </div>  

    <div className='flex items-center justify-evenly' >
      <label className ='block text-black text-[20px] font-semibold m-3 '>
      Row : 
      </label>
        <input  
          type="number"  
          min="10"  
          value={gridHeight}  
          onChange={(e) => setGridHeight(Number(e.target.value))}  
          placeholder="Rows"  
           className='shadow appearance-none border rounded w-[100px] py-1 px-5 text-gray-400 leading-tight focus:outline-none focus:shadow-outline'
        />  
    </div>

    <div className='flex items-center justify-center' >
      <label className ='block text-black text-[20px] font-semibold m-3'>
       Space :
      </label>
        <input  
          type="number"  
          min="1"  
          value={letterHeight}  
          onChange={(e) => setLetterHeight(Number(e.target.value))}  
          placeholder="Letter Height" 
          className='shadow appearance-none border rounded w-[100px] py-1 px-5 text-gray-400 leading-tight focus:outline-none focus:shadow-outline' 
        /> 
      </div> 

      <div className='flex items-center justify-center' >
      <label className="block text-black text-[20px] font-semibold m-3" >
        Word : 
      </label>
        <input  
          type="text"  
          value={movingWord}  
          onChange={(e) => setMovingWord(e.target.value)}  
          placeholder="Enter text to move"
          className='shadow appearance-none border rounded w-[130px]  py-1 px-5 text-gray-400 leading-tight focus:outline-none focus:shadow-outline'  
        /> 
      </div>  
</div>  
      <GridContainer gridWidth={gridWidth} gridHeight={gridHeight} className='absolute left-[10.5%] top-[34%] '>  
        {grid.map((row, rowIndex) =>  
          row.map((isLetter, columnIndex) => (  
            <GridItem  
              key={`${rowIndex}-${columnIndex}`}  
              isLetter={isLetter}  
              color={isLetter ? textColor : '#000'}  
            />  
          ))  
        )}  
      </GridContainer>
 
    </>  
  );  
};  

export default PatternDisplay;

