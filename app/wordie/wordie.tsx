'use client'

import classNames from "classnames";
import { useState } from "react";

const Wordie = () => {
    const word = "apple";
    const columns = 5
    const rows = 6

    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");

    const handleButtonClick = (value: string) => {
        if (value === "Back") {
            if (currentGuess.length >= 0) {
                setCurrentGuess(currentGuess.slice(0, -1))
            }
        } else if (value === "Enter") {
            if (currentGuess.length === 5) {
                setGuesses([...guesses, currentGuess]);
                setCurrentGuess("")
            }
        } else if (currentGuess.length === 5) {
            return
        } else {
            setCurrentGuess(currentGuess + value);
        }
    }

    const wordIncludes = (character: string) => {
        return word.split("").includes(character)
    }
    const wordIncludesExactly = (character: string, column: number) => {
        return word.split("")[column] === character
    }

    const boxClasses = "flex place-items-center aspect-[1] p-3 font-sans font-bold text-lg text-center uppercase"

    return (
        <div className="h-full space-y-5 flex flex-col place-items-center">

            <div className="grow grid grid-cols-5 grid-rows-6 gap-1 w-full aspect-[1]">
                {guesses.map((guess, row) => (
                    <>
                        {guess.split("").map((character, column) => (
                            <div key={column} className={classNames(
                                boxClasses,
                                {
                                    "bg-gray-100": !wordIncludes(character),
                                    "bg-yellow-200": !wordIncludesExactly(character, column) && wordIncludes(character),
                                    "bg-green-500": wordIncludesExactly(character, column),
                                }
                            )}>
                                {character}
                            </div>
                        ))}
                    </>
                ))}

                {currentGuess.padEnd(columns).split("").map((character, index) => (
                    <div
                        key={index}
                        className={classNames(
                            boxClasses,
                            "border-2",
                            {
                                "border-gray-200": !!!character,
                                "border-gray-400": !!character,
                            }
                        )}
                    >
                        {character}
                    </div>
                ))}

                <>
                    {Array.from({ length: rows - guesses.length - 1 }).map(() => (
                        <>
                            {
                                Array.from({ length: columns }).map((_, column) => (
                                    <div
                                        key={column}
                                        className={
                                            classNames(
                                                boxClasses,
                                                "border-2"
                                            )
                                        }>
                                    </div>
                                ))
                            }
                        </>

                    ))}
                </>
            </div>


            <div className="space-y-1 mx-auto">
                {
                    [
                        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                        ["Enter", "z", "x", "c", "v", "b", "n", "m", "Back"]].map((group, i) => (
                            <div key={i} className="flex gap-1 justify-center">
                                {
                                    group.map((value) => (
                                        <button key={value} className="p-1 bg-gray-300 text-xs font-bold text-gray-800" onClick={() => handleButtonClick(value)}>{value}</button>
                                    ))
                                }
                            </div>

                        ))
                }
            </div>
        </div >

    )
}

export default Wordie

