import { Request, Response } from 'express';
import Beeper from '../models/beeper';
import * as beeperService from '../services/beeperService';

// קבלת כל הביפרים
export const getBeepers = async (req: Request, res: Response): Promise<void> => {
  try {
    const beepers = await beeperService.getAllBeepers();
    if (beepers.length === 0) {
      res.status(404).json({ message: 'לא נמצאו ביפרים' });
    } else {
      res.json(beepers);
    }
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בקבלת הביפרים', error });
  }
};

// יצירת ביפר חדש
export const createBeeper = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const newBeeper = new Beeper(name);
    await beeperService.addBeeper(newBeeper);
    res.status(201).json(newBeeper);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה ביצירת הביפר', error });
  }
};

// קבלת ביפר לפי איי די
export const getBeeperById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const beeper = await beeperService.getBeeperById(id);
    if (beeper) {
      res.json(beeper);
    } else {
      res.status(404).json({ message: 'ביפר לא נמצא' });
    }
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בקבלת הביפר', error });
  }
};

// עדכון סטטוס של ביפר לפי איי די
export const updateBeeperStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { status, latitude, longitude } = req.body;

    const result = await beeperService.updateBeeperStatus(id, status, { latitude, longitude });
    
    if (typeof result === 'string') {
      res.status(400).json({ message: result });
    } else if (result) {
      res.json({ message: 'הסטטוס עודכן' });
    } else {
      res.status(404).json({ message: 'ביפר לא נמצא או שהסטטוס לא ניתן לעדכון' });
    }
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בעדכון הסטטוס', error });
  }
};

// מחיקת ביפר לפי איי די
export const deleteBeeper = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const success = await beeperService.deleteBeeper(id);
    if (success) {
      res.status(200).json({ message: 'הביפר נמחק בהצלחה' }); 
    } else {
      res.status(404).json({ message: 'ביפר לא נמצא' });
    }
  } catch (error) {
    res.status(500).json({ message: 'שגיאה במחיקת הביפר', error });
  }
};

// קבלת ביפרים לפי סטטוס
export const getBeepersByStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.params;
    const beepers = await beeperService.getBeepersByStatus(status);
    if (beepers.length === 0) {
      res.status(404).json({ message: 'לא נמצאו ביפרים עם הסטטוס הזה' });
    } else {
      res.json(beepers);
    }
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בקבלת הביפרים לפי סטטוס', error });
  }
};
