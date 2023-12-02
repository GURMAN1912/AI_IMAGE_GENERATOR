import {surpriseMePrompts} from "../constant"
import FileSaver from 'file-saver'
export function getRamdomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompt=surpriseMePrompts[randomIndex];
    if(randomPrompt===prompt) return getRamdomPrompt(prompt)
    return randomPrompt;
}
export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}
