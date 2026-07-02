from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.historico_service import obtener_tickets, obtener_movimientos_ticket

router = APIRouter(prefix="/historico", tags=["Histórico"])

@router.get("/")
def listar_tickets(db: Session = Depends(get_db)):
    return obtener_tickets(db)

@router.get("/{ticket_id}")
def detalle_ticket(ticket_id: int, db: Session = Depends(get_db)):
    return obtener_movimientos_ticket(ticket_id, db)
