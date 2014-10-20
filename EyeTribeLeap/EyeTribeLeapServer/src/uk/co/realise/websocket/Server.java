package uk.co.realise.websocket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.util.HashSet;
import java.util.Set;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import uk.co.realise.devices.LeapMotion;
import uk.co.realise.utils.CommandPrompt;


public class Server extends WebSocketServer {

  /*The web socket port number*/
  private static int PORT = 8887;
  
  /*Stock connections here*/
  private Set<WebSocket> conns = new HashSet<>();;
  
  /*Command prompt*/
  private Thread cp = new CommandPrompt(this.conns);
  
  /*Leap Motion*/
  private LeapMotion lp = new LeapMotion(this.conns);
  
  /**
   * Creates a new WebSocketServer with the wildcard IP accepting all connections.
   */
  public Server() {
	  //Start WebSocket server
	  super(new InetSocketAddress(PORT));
	  //Start Leap
	  this.lp.start();
	  //Start Command prompt
	  //this.cp.start();	  
  }
  
  /** 
   * Method handler when a new connection has been opened. 
   */
  @Override
  public void onOpen(WebSocket conn, ClientHandshake handshake) {
    conns.add(conn);
    System.out.println("New connection from " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
  }

  /** 
   * Method handler when a connection has been closed.
   */
  @Override
  public void onClose(WebSocket conn, int code, String reason, boolean remote) {
    conns.remove(conn);
    System.out.println("Closed connection to " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
  }

  /** 
   * Method handler when a message has been received from the client.
   */
  @Override
  public void onMessage(WebSocket conn, String message) {
    System.out.println("Received: " + message);
  }
  

  /** 
   * Method handler when an error has occured.
   */
  @Override
  public void onError(WebSocket conn, Exception ex) {
    System.out.println("ERROR from " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
  }
  
  
  /**
   * Main method.
   */
  public static void main(String[] args) {
    Server server = new Server();
    server.start();
  }
  
}
