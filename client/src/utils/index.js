import {surpriseMePrompts} from "../constant"

export function getRamdomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompt=surpriseMePrompts[randomIndex];
    if(randomPrompt===prompt) return getRamdomPrompt(prompt)
    return randomPrompt;
}