import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { setMyID, setPreferredGame } from "@/store/settingsSlice";
import type { RootState } from "@/store";
import { Label } from "@radix-ui/react-label";
import Chess from "./chess";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Home(){
    const myid = useSelector((state: RootState) => state.friends.myid);
    const dispatch = useDispatch();   
    function updateID(email: string){
        // check is valid
        dispatch(setMyID(email));
    }
    function updateGame(game: string){
        //alert(name);
        dispatch(setPreferredGame(game));
    }
    const validEmail = emailRegex.test(myid);
    return (
        <div className=""> 
            <h1>WebRTC Test</h1>
            {!validEmail && <p>Enter your email address, to join games and for your friends to be able to find you.</p>}
            <div className="flex items-center space-x-2">
                <Label htmlFor="myemail">My ID: </Label>
                <Input id="myemail" className="w-80 mt-2" placeholder="Your email address..." value={myid} 
                    onChange={(e) => updateID(e.target.value)}  /> 
            </div>
            {validEmail && <>   
                <p>Once your email is set, you can join a game:</p>
                <div className="flex items-center m-2">
                    <ToggleGroup type="single"  defaultValue="chess" onValueChange={updateGame}>
                        <ToggleGroupItem value="rps" className="w-40">
                            Rock Paper Scissors
                        </ToggleGroupItem>
                        <ToggleGroupItem value="chess" className="w-40">
                            Chess
                        </ToggleGroupItem>
                        <ToggleGroupItem value="whack" className="w-40">
                            Whack A Mole
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>            
                <p className="w-150">This sets you preferred game. When joining a peer who selected a different game, 
                    one of the two games is selected at random.</p>  
            </>}
            {<Chess />}
        </div>
    );
}