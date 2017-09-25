module hitTest{  //check hit
    export class hitTest{
        public static hitTest(obj1:egret.Sprite,obj2:egret.Sprite):boolean
        { 
            let rect_1:egret.Rectangle = obj1.getBounds();
            let rect_2:egret.Rectangle = obj2.getBounds();
            rect_1.x = obj1.x;
            rect_1.y = obj1.y;
            rect_1.width=obj1.width;
            rect_1.height = obj1.height;
            rect_2.x = obj2.x;
            rect_2.y = obj2.y;
            rect_2.width=obj2.width;
            rect_2.height = obj2.height;
            return rect_1.intersects(rect_2);
        }
        public static checkHit(obj1,obj2):boolean {
            
            let  
            [   x1,  y1,  w1,  h1,   
                x2, y2,  w2,  h2] = 
            [   obj1.localToGlobal().x,obj1.localToGlobal().y,obj1.width,obj1.height,
                obj2.localToGlobal().x,obj2.localToGlobal().y,obj2.width,obj2.height,];  
            if (x1 >= x2 && x1 >= x2 + w2) {  
                return false;  
            } else if (x1 <= x2 && x1 + w1 <= x2) {  
                return false;  
            } else if (y1 >= y2 && y1 >= y2 + h2) {  
                return false;  
            } else if (y1 <= y2 && y1 + h1 <= y2) {  
                return false;  
            }  
            return true;  
        }  
    }
}