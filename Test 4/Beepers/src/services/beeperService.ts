import { BeeperStatus } from '../enums/beeperStatus';
import Beeper from '../models/beeper';
import * as dal from '../DAL/beeperDAL';


// פונקציה שבודקת האם הסטטוס מתקדם רק בכיוון אחד
export const canUpdateStatus = (currentStatus: BeeperStatus, newStatus: BeeperStatus): boolean => {
  const statusOrder = [
    BeeperStatus.Manufactured,
    BeeperStatus.Assembled,
    BeeperStatus.Shipped,
    BeeperStatus.Deployed,
    BeeperStatus.Detonated
  ];

  const currentStatusIndex = statusOrder.indexOf(currentStatus);
  const newStatusIndex = statusOrder.indexOf(newStatus);

  return newStatusIndex > currentStatusIndex;
};

// קבלת כל הביפרים
export const getAllBeepers = async (): Promise<Beeper[]> => {
  try {
    return await dal.readBeepers();
  } catch (error) {
    throw new Error('שגיאה בקבלת כל הביפרים: ' + error);
  }
};

// הוספת ביפר חדש
export const addBeeper = async (beeper: Beeper): Promise<void> => {
  try {
    const beepers = await dal.readBeepers();
    beepers.push(beeper);
    await dal.writeBeepers(beepers);
  } catch (error) {
    throw new Error('שגיאה בהוספת הביפר: ' + error);
  }
};

// קבלת ביפר לפי איי די
export const getBeeperById = async (id: number): Promise<Beeper | undefined> => {
  try {
    const beepers = await dal.readBeepers();
    return beepers.find(beeper => beeper.id === id);
  } catch (error) {
    throw new Error('שגיאה בקבלת הביפר לפי מזהה: ' + error);
  }
};


const startDetonationTimer = async (beepers: Beeper[], index: number): Promise<void> => {
  setTimeout(async () => {
    beepers[index].status = BeeperStatus.Detonated;
    beepers[index].detonated_at = new Date();
    await dal.writeBeepers(beepers);
  }, 10000); 
};

// עדכון סטטוס של ביפר לפי מזהה
export const updateBeeperStatus = async (
  id: number, 
  status: string, 
  coordinates?: { latitude?: number; longitude?: number }
): Promise<boolean | string> => {
  try {
    const beepers = await dal.readBeepers();
    const index = beepers.findIndex(beeper => beeper.id === id);

    if (index !== -1) {
      const newStatus = status as BeeperStatus;
      const currentStatus = beepers[index].status;

      if (canUpdateStatus(currentStatus, newStatus)) {
        if (newStatus === BeeperStatus.Deployed) {
          if (!coordinates?.latitude || !coordinates?.longitude) {
            return 'Deployed דורש קואורדינטות';
          }

          // בדיקת טווח הקואורדינטות
          const isLongitudeValid = coordinates.longitude >= 35.04438 && coordinates.longitude <= 36.59793;
          const isLatitudeValid = coordinates.latitude >= 33.01048 && coordinates.latitude <= 34.6793;

          if (!isLongitudeValid || !isLatitudeValid) {
            return 'קואורדינטות צריכות להיות בטווח';
          }

          beepers[index].latitude = coordinates.latitude;
          beepers[index].longitude = coordinates.longitude;

          // התחלת טיימר
          startDetonationTimer(beepers, index);
        } else if (newStatus === BeeperStatus.Detonated) {
          beepers[index].detonated_at = new Date();
        }

        // עדכון הסטטוס
        beepers[index].status = newStatus;
        await dal.writeBeepers(beepers);
        return true;
      }
      return false; 
    }

    return false; 
  } catch (error) {
    throw new Error('שגיאה בעדכון הסטטוס של הביפר: ' + error);
  }
};

// מחיקת ביפר לפי איי די
export const deleteBeeper = async (id: number): Promise<boolean> => {
  try {
    let beepers = await dal.readBeepers();
    const initialLength = beepers.length;
    beepers = beepers.filter(beeper => beeper.id !== id);
    if (initialLength !== beepers.length) {
      await dal.writeBeepers(beepers);
      return true; 
    }
    return false; 
  } catch (error) {
    throw new Error('שגיאה במחיקת הביפר: ' + error);
  }
};

// קבלת ביפרים לפי סטטוס
export const getBeepersByStatus = async (status: string): Promise<Beeper[]> => {
  try {
    const beepers = await dal.readBeepers();
    return beepers.filter(beeper => beeper.status === status);
  } catch (error) {
    throw new Error('שגיאה בקבלת הביפרים ' + error);
  }
};
