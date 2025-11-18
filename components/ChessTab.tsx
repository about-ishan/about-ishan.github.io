import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { RotateCcw, Cpu } from 'lucide-react';

export const ChessTab: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState("");
  const [aiThinking, setAiThinking] = useState(false);

  // PIECE VALUES FOR EVALUATION
  const pieceValues: Record<string, number> = {
    p: 10,
    n: 30,
    b: 30,
    r: 50,
    q: 90,
    k: 900,
  };

  const evaluateBoard = (board: any[][]) => {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
            // Base value
            const value = pieceValues[piece.type] || 0;
            
            // Positional tweaks (encourage center control for white)
            let positionBonus = 0;
            if ((i === 3 || i === 4) && (j === 3 || j === 4)) positionBonus = 2;

            totalEvaluation += (value + positionBonus) * (piece.color === 'w' ? 1 : -1);
        }
      }
    }
    return totalEvaluation;
  };

  // MINIMAX ALGORITHM (Depth 3)
  const minimax = (
    gameObj: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizingPlayer: boolean
  ): number => {
    if (depth === 0 || gameObj.isGameOver()) {
      return -evaluateBoard(gameObj.board()); // AI plays Black (minimizing in this evaluation function, but we invert logic below)
    }

    const moves = gameObj.moves();
    
    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of moves) {
        gameObj.move(move);
        const evalVal = minimax(gameObj, depth - 1, alpha, beta, false);
        gameObj.undo();
        maxEval = Math.max(maxEval, evalVal);
        alpha = Math.max(alpha, evalVal);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        gameObj.move(move);
        const evalVal = minimax(gameObj, depth - 1, alpha, beta, true);
        gameObj.undo();
        minEval = Math.min(minEval, evalVal);
        beta = Math.min(beta, evalVal);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const getBestMove = (gameObj: Chess) => {
    const moves = gameObj.moves();
    let bestMove = null;
    let bestValue = -Infinity;

    // Simple randomization for opening variety if evaluations are equal
    moves.sort(() => Math.random() - 0.5);

    for (const move of moves) {
      gameObj.move(move);
      // Depth 2 ensures responsiveness without WebWorkers while still being tricky (approx 1400-1500 elo style)
      const boardValue = minimax(gameObj, 2, -Infinity, Infinity, false); 
      gameObj.undo();

      if (boardValue >= bestValue) {
        bestValue = boardValue;
        bestMove = move;
      }
    }
    return bestMove;
  };

  const makeAiMove = useCallback(() => {
    if (game.isGameOver() || game.turn() === 'w') return;

    setAiThinking(true);
    
    // Small timeout to allow UI to render and simulate thinking time
    setTimeout(() => {
        const gameCopy = new Chess(game.fen());
        const move = getBestMove(gameCopy);
        
        if (move) {
            gameCopy.move(move);
            setGame(gameCopy);
        }
        setAiThinking(false);
    }, 500);
  }, [game]);

  useEffect(() => {
    if (game.turn() === 'b' && !game.isGameOver()) {
      makeAiMove();
    }
    
    if (game.isGameOver()) {
        if (game.isCheckmate()) setStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`);
        else if (game.isDraw()) setStatus("Draw.");
        else setStatus("Game Over.");
    } else {
        setStatus(game.turn() === 'w' ? "Your Turn" : "Arthur's Bot is thinking...");
    }
  }, [game, makeAiMove]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (game.turn() === 'b' || game.isGameOver()) return false;

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', 
      });

      if (move === null) return false;
      setGame(gameCopy);
      return true;
    } catch (e) {
        return false;
    }
  }

  const resetGame = () => {
    setGame(new Chess());
    setStatus("New Game Started");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 pt-6 pb-20 flex flex-col items-center"
    >
       <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-stone-900">Strategic Patience</h2>
        <p className="text-stone-500 font-light mt-2 italic">"To play chess is to analyze the past to predict the future."</p>
      </div>

      <div className="bg-white/40 p-4 rounded-sm shadow-xl border border-stone-200/50 backdrop-blur-sm mb-6 relative">
        <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            <Chessboard 
                position={game.fen()} 
                onPieceDrop={onDrop}
                customDarkSquareStyle={{ backgroundColor: '#d6d3d1' }} // stone-300
                customLightSquareStyle={{ backgroundColor: '#fafaf9' }} // stone-50
                customBoardStyle={{
                    borderRadius: '2px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                animationDuration={300}
            />
        </div>
        
        {/* Thinking Indicator Overlay */}
        {aiThinking && (
            <div className="absolute top-4 right-4">
                <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-500"></span>
                </span>
            </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="w-full flex items-center justify-between px-4 py-3 bg-white/60 border border-stone-200 rounded-sm">
            <div className="flex items-center gap-3">
                <Cpu className={`w-4 h-4 ${aiThinking ? 'text-stone-800 animate-pulse' : 'text-stone-400'}`} />
                <span className="text-sm font-medium text-stone-700 uppercase tracking-wider">{status}</span>
            </div>
            <button 
                onClick={resetGame}
                className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-600"
                title="Reset Board"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
        </div>

        <p className="text-xs text-stone-400 text-center max-w-xs leading-relaxed">
            This engine evaluates moves at a depth of 3 (approx. 1500 Elo). <br/>
            It values material and center control.
        </p>
      </div>
    </motion.div>
  );
};
