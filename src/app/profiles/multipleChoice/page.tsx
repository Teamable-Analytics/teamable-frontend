'use client'

import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useReducer, useState } from "react"
import Navbar from "@/components/ui/navbar"
import Breadcrumbs from "@/components/ui/breadcrumbs"

interface Answer {
    name: string
    order: number
    label: string
    value: number
}

const  Home = () => {

    const [questionName, setQuestionName] = useState('')
    const [questionText, setQuestionText] = useState('What is your favorite color?')
    const [answers, setAnswers] = useState<Answer[]>([{name: '', order: 0, label: '', value: 0}])
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    return (
        <>
            <Navbar></Navbar>

            <Breadcrumbs></Breadcrumbs>

            <div className="container py-5">
                <span className="text-2xl font-bold">Profiles</span>
            </div>

            <div className="container mx-auto">

                {/* EDITOR */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Card>
                            <br></br>
                            <CardContent>
                            <div>
                                Name
                                <Input type="text" placeholder="" onChange={(e) => {
                                    setQuestionName(e.target.value)
                                }}/>
                            </div>
                            
                            <div>
                                Question Text
                                <Input type="text" placeholder="" value={questionText} onChange={(e) => {
                                    setQuestionText(e.target.value)
                                }}/>
                            </div>
                            
                            Answer Group Name
                            <br></br>
                            <Input type="text" placeholder="" onChange={(e) => {
                                }} />
                            {answers.map((answer, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-3">
                                        <div className="col-span-1">
                                            Order
                                            <Input type="number" placeholder="" min='1' defaultValue={index + 1} onChange={(e) => {
                                                answers[index].order = parseInt(e.target.value)
                                                forceUpdate()
                                            }} />
                                        </div>
                                        <div className="col-span-1">
                                            Answer Label
                                            <Input type="text" placeholder="" onChange={(e) => {
                                                answers[index].label = e.target.value
                                                forceUpdate()
                                            }} />
                                        </div>
                                        <div className="col-span-1">
                                            Answer Value
                                            <Input type="number" placeholder="" onChange={(e) => {
                                            }} />
                                        </div>
                                    </div>
                                )
                            })}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={() => {setAnswers([...answers, {name: '', order: answers.length + 1, label: '', value: 0}]); forceUpdate()}}>Add Answer</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    
                    
                    {/* VIEWER */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>{questionText}</CardTitle>
                            </CardHeader>
                            <RadioGroup>
                                {answers.slice(0).sort((a, b) => a.order > b.order ? 1 : -1).map((answer, index) => {
                                    return (
                                        <CardContent key={index}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value={'' + index} id={'' + index} />
                                                <Label htmlFor={'' + index}>{answer.label}</Label>
                                            </div>
                                        </CardContent>
                                    )
                                })}
                            </RadioGroup>
                        </Card>
                    </div>
                    
                </div>
            </div>
        </>
      )
}

export default Home
