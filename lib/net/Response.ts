import { AuthToken } from "../domain/AuthToken";
import { Status } from "../domain/Status";
import { User } from "../domain/User";


export class TweeterResponse{

    success: boolean;
    message: String | null;

    constructor(success: boolean, message: String | null = null){
        this.success = success;
        this.message = message;
    }
}
export class AuthenticateResponse extends TweeterResponse{

    user: User;
    token: AuthToken;
    
    constructor(success: boolean, user: User, token: AuthToken, message: String | null = null){
        super(success, message);
        this.user = user;
        this.token = token;
    }
    static fromJson(response: AuthenticateResponse): AuthenticateResponse {

        let deserializedUser = User.fromJson(JSON.stringify(response.user));
        if(deserializedUser === null) throw new Error('AuthenticateResponse, could not deserialize user with json:\n' + JSON.stringify(response.user));
        let deserializedToken = AuthToken.fromJson(JSON.stringify(response.token));
        if(deserializedToken === null) throw new Error('AuthenticateResponse, could not deserialize token with json:\n' + JSON.stringify(response.token));
        let deserializedResponse = new AuthenticateResponse(response.success, deserializedUser, deserializedToken, response.message);
        return deserializedResponse;
    }
}
export class FollowCountResponse extends TweeterResponse{

    count: number;
    
    constructor(success: boolean, count: number, message: String | null = null){
        super(success, message);
        this.count = count;
    }
}
export class UserResponse extends TweeterResponse{

    user: User;
    
    constructor(success: boolean, user: User, message: String | null = null){
        super(success, message);
        this.user = user;
    }

    static fromJson(response: UserResponse): UserResponse {
        
        let deserializedUser = User.fromJson(JSON.stringify(response.user));
        if(deserializedUser === null) throw new Error('UserResponse, could not deserialize user with json:\n' + JSON.stringify(response.user));
        let deserializedResponse = new UserResponse(response.success, deserializedUser, response.message);
        return deserializedResponse;
    }
}
export class IsFollowingResponse extends TweeterResponse{

    follows: boolean
    
    constructor(success: boolean, follows: boolean, message: String | null = null){
        super(success, message);
        this.follows = follows;
    }
}
class PagedResponse<T> extends TweeterResponse{

    itemList: T[];
    hasMorePages: boolean;

    constructor(success: boolean, itemList: T[], hasMorePages: boolean, message: String | null = null){
        super(success, message);
        this.itemList = itemList;
        this.hasMorePages = hasMorePages;
    }
}
export class FollowListResponse extends PagedResponse<User>{

    constructor(success: boolean, hasMorePages: boolean, itemList: User[], message: String | null = null){
        super(success, itemList, hasMorePages, message);
    }
    static fromJson(response: FollowListResponse): FollowListResponse {
        let followList: User[] = [];
        for(let userJsonIndex in response.itemList){
            let userJson = response.itemList[userJsonIndex];
            let deserializedUser = User.fromJson(JSON.stringify(userJson));
            if(deserializedUser === null) throw new Error('FollowListResponse, could not deserialize user with json:\n' + JSON.stringify(userJson));
            else followList.push(deserializedUser);
        }
        let deserializedResponse = new FollowListResponse(response.success, response.hasMorePages, followList, response.message);
        return deserializedResponse;
    }
}
export class StoryFeedResponse extends PagedResponse<Status>{

    constructor(success: boolean, hasMorePages: boolean, itemList: Status[], message: String | null = null){
        super(success, itemList, hasMorePages, message);
    }

    static fromJson(response: StoryFeedResponse): StoryFeedResponse {
        let statusList: Status[] = [];
        for(let statusJsonIndex in response.itemList){
            let statusJson = response.itemList[statusJsonIndex]
            let deserializedStatus = Status.fromJson(JSON.stringify(statusJson));
            if(deserializedStatus === null) throw new Error('StoryFeedResponse, could not deserialize status with json:\n' + JSON.stringify(statusJson));
            else statusList.push(deserializedStatus);
        }
        let deserializedResponse = new StoryFeedResponse(response.success, response.hasMorePages, statusList, response.message);
        return deserializedResponse;
    }
}