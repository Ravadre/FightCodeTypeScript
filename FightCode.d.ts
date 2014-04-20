interface FightCodeRobot {
    onIdle? (ev: IdleEvent): void;
    onRobotCollision? (ev: RobotCollisionEvent): void;
    onWallCollision? (ev: WallCollisionEvent): void;
    onScannedRobot? (ev: ScannedRobotEvent): void;
    onHitByBullet? (ev: HitByBulletEvent): void;
}

interface IRobot {
    /** Id from your robot */
    id: string;

    /** Current angle from your robot in degrees */
    angle: number;

    /** Current angle from your cannon relative to your robot */
    cannonRelativeAngle: number;   

    /** Current angle from your cannon relative to the board */
    cannonAbsoluteAngle: number;   

    /** Current robot position on the board */
    position: {
        /** X position in the board from your robot */
        x: number;
        /** Y position in the board from your robot */
        y: number;
    };

    /** Percentage of the life from your robot */
    life: number;             
    
    /**
     *  Time remaining in the cooldown from your cannon after shooting
     */     
    gunCoolDownTime: number;     

    /** Number of available clones you can use */
    availableClones: number;

    /** Number of available disappears you can use */
    availableDisappears: number;   
    
     /** 
      * In the case of being a clone, the id from your parent element.
      * Null otherwise 
      */
    parentId: number; 

    /** Width from the board */
    arenaWidth;            

    /** Height from the board */
    arenaHeight;            

    /** Moves the given amount ahead */
    ahead(amount: number): void;

    /** Moves the given amount backwards */
    back(amount: number);

    /** Moves ahead if direction equals to 1, backwards otherwise */
    move(amount: number, direction: number): void;

    /** Rotates your cannon angle by the specified number of degrees */
    rotateCannon(amount: number): void;

    /**
     * Turns the cannon gun left relative to the robot by the specified
     * number of degrees (equivalent to rotateCannon(-1 * amount))
     */ 
    turnGunLeft(degrees: number): void;

    /**
     * Turns the cannon gun right relative to the robot by the specified
     * number of degrees (equivalent to rotateCannon(amount))
     */
    turnGunRight(degrees: number): void;

    /** Rotates your robot the by the specified number of degrees */
    turn(degrees: number): void;

    /**
     * Rotates your robot to the left by the specified number of
     * degrees (equivalent to turn(-1 * degrees))
     */
    turnLeft(degrees: number): void;

    /**
     * Rotates your robot to the right by the specified number of
     * degrees (equivalent to turn(degrees))
     */
    turnRight(degrees: number): void;

    /**
     * Fires your cannon. This functin has a cooldown before you can
     * use it again.
     */
    fire(): void;
    
    /**
     * Subscribe to get notified whenever this action gets called
     * in the queue.
     */
    notify(callback: any): void;

    /** Removes all remaining actions your robot has from the queue */
    stop(): void;

    /** 
     * Clones your robot into another robot and can only be used once
     * per fight. Remember to check the parentId property to stop
     * your clone from shooting you.
     */
    clone(): void;

    /**
     * Disappear your robot for 200 rounds, doing your robot undetected
     * by enemy robots (onScannedRobot the event is not triggered) and
     * can only be used once per fight.
     */
    disappear(): void;

    /** Logs message to the console. */
    log(message: string): void;

    /**
     * Stops your robot from listening a given event (onWallColision,
     * for instance).
     */
    ignore(eventName: string): void;

    /** Starts listening a given event (onWallColision, for instance). */
    listen(eventName: string): void;
}

interface IdleEvent {
    /** Robot */
    robot: IRobot
}

interface RobotCollisionEvent {
    /** Robot */
    robot: IRobot;

    /**
     * Degrees that the other robot relative to my robot
     * this property can vary from -180 to 180 degrees.
     */
    bearing: number;

    /**
     * Information on the robot that collided with mine
     */
    collidedRobot: {
        /** Id from the robot */
        id: string;

        /** Position of other robot */
        position: {
            /** X position from the other robot relative to the board */
            x: number;
            /** Y position from the other robot relative to the board */
            y: number;
        };

        /** Angle from the other robot */
        angle: number;

        /** Cannon angle relative to the other robot */
        cannonAngle: number;

        /** Percentage of life from the other robot */
        life: number;

        /**
         * If this is a clone, the clone's parent id.
         * Null otherwise.
         */
        parentId: number;
    };

    /** 
     * Boolean value that indicates whether I hit the other
     * robot or the opposite
     */
    myFault: boolean;
}

interface WallCollisionEvent {
    robot: IRobot;

    /**
     * Degrees of the wall relative to my robot
     * this property can vary from -180 to 180 degrees
     */
    bearing: boolean;
}

interface ScannedRobotEvent {
    robot: IRobot;

    scannedRobot: {
        /** Id from the robot */
        id: string;

        /** Position of a scanned robot. */
        position: {
            /** X position from the other robot relative to the board */
            x: number;
            /** Y position from the other robot relative to the board */
            y: number;
        };

        /** Angle from the other robot */
        angle: number;

        /** Cannon angle relative to the other robot */
        cannonAngle: number;

        /** Percentage of life from the other robot */
        life: number;

        /**
         * If this is a clone, the clone's parent id.
         * Null otherwise.
         */
        parentId: number;   
    };
}

interface HitByBulletEvent {
    robot: IRobot;

    /**
     * Angle that the bullet came from relative
     * to my tank's angle
     */
    bearing: boolean;
}
