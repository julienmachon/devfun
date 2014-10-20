package uk.co.realise.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Set;

import org.java_websocket.WebSocket;

/**
 * Simple command prompt. 
 * 
 * It is a thread that takes user input and send it to all connections within private attribute wss
 * 
 * @author julien
 *
 */
public class CommandPrompt extends Thread{
	//Socket to send command on
	private Set<WebSocket> wss;
	  
  	public CommandPrompt(Set<WebSocket> conns) {
  		super();
  		this.wss = conns;
  	}

    public void run() {
    	while(true) {
	    	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	        System.out.print("Enter command> ");
	        try {
				String s = br.readLine();
				for(WebSocket ws : wss) {
					ws.send("{\"command\": \""+s+"\"}");
				}
				System.out.flush();
			} catch (IOException e) {
				e.printStackTrace();
			}
        }
    }

}
