from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, Request
from sqlalchemy.orm import Session
from src.schemas import DocumentUpdateContentRequest, DocumentUpdateNameRequest
from src.services.documents import (service_update_document,
                                    service_update_document_plaintext,
                                    service_update_document_title)
from src.utils import db_session, needs_auth, ws_needs_auth, decode_jwt_token

update_document_router = APIRouter()

active_connections = {}


@update_document_router.get("/test")
def test_route():
    return {
        "message": "Hello File"
    }

@update_document_router.put("/rename/{document_hash}", status_code=200)
def update_document_rename_route(
    document_hash: str,
    data: DocumentUpdateNameRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    print(data)
    return service_update_document_title(
        uuid=int(auth.get("sub")),
        document_hash=document_hash,
        name=data.name,
        db=db
    )

@update_document_router.post("/update/{document_hash}", status_code=200)
@update_document_router.put("/update/{document_hash}", status_code=200)
def update_document_content_route(
    document_hash: str,
    data: DocumentUpdateContentRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    print("[cyan]Updating document content...[/cyan]")
    return service_update_document_plaintext(
        uuid=int(auth.get("sub")),
        document_hash=document_hash,
        content=data.content,
        db=db
    )


@update_document_router.post("/update_exit/{document_hash}", status_code=200)
async def update_document_content_route_on_exit(
    document_hash: str,
    request: Request,
    db: Session = Depends(db_session.get_session)
):
    data = await request.json()
    print(data)
    auth = decode_jwt_token(data["token"])

    print("[cyan]Updating document content...[/cyan]")
    return service_update_document_plaintext(
        uuid=int(auth.get("sub")),
        document_hash=document_hash,
        content=data.get("content"),
        db=db
    )

@update_document_router.websocket("/ws/document/{document_hash}")
async def ws_update_document_content_route(
    document_hash: str,
    websocket: WebSocket,
    db: Session = Depends(db_session.get_session)
):
    print("[cyan]Beginning websocket connection for document updates.[/cyan]")
    # Get auth data
    auth = await ws_needs_auth(websocket=websocket)

    print("[cyan]Accepting websocket connection for document updates.[/cyan]")
    # Accept websocket connection
    await websocket.accept()

    if document_hash not in active_connections:
        active_connections[document_hash] = []

    active_connections[document_hash].append(websocket)

    try:
        while True:
            # Get sent data from socket
            data = await websocket.receive_json()
            print(data)

            print("[cyan]Calling service to insert diff in the database[/cyan]")
            service_update_document(
                uuid=int(auth.get("sub")),
                document_hash=document_hash,
                content=data,
                db=db
            )

            # Send inserted diff to all open connections for the document
            for conn in active_connections[document_hash]:
                if conn != websocket:
                    try:
                        await conn.send_json(data)
                    except Exception as e:
                        print(f"[red]Error sending diff to a connection:[/red]", e)

    except WebSocketDisconnect:
        print("[yellow]Closing websocket connection for document updates.[/yellow]")
        active_connections[document_hash].remove(websocket)
