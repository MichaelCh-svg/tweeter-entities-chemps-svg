import { AuthToken } from "../domain/AuthToken";
import { Status } from "../domain/Status";
import { User } from "../domain/User";


export class LoginRequest{

    username: string;
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
}
export class RegisterRequest {

    username: string;
    firstName: string;
    lastName: string;
    password: string;
    imageUrl: string;

    public constructor(username: string, firstName: string, lastName: string, password: string, imageUrl: string) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.imageUrl = imageUrl;
    }

}
export class AuthorizedRequest{

    token: AuthToken

    constructor(token: AuthToken){
        this.token = token;
    }

    static fromJson (request: AuthorizedRequest){
        let token = AuthToken.fromJson(JSON.stringify(request.token));
        if(token == null) throw new Error('Authorized Request, could not deserialize token with json:\n' + JSON.stringify(request.token));
        else{
            let deseralizedRequest = new AuthorizedRequest(token);
            return deseralizedRequest;
        }
    }
}

export class UserRequest extends AuthorizedRequest{

    username: string;

    constructor(token: AuthToken, username: string){
        super(token);
        this.username = username
    }

    static fromJson (request: UserRequest){
        let authorizedRequest: AuthorizedRequest;
        try{
            authorizedRequest = AuthorizedRequest.fromJson(request);
        } 
        catch(err){
            throw new Error('UserRequest error: ' + err);
        }
        let deseralizedRequest = new UserRequest(authorizedRequest.token, request.username);
        return deseralizedRequest;
    }
}

export class PostStatusRequest extends AuthorizedRequest {

    post: string;

    constructor(token: AuthToken, post: string){
        super(token);
        this.post = post;
    }

    static fromJson (request: PostStatusRequest){
        let authorizedRequest: AuthorizedRequest;
        try{
            authorizedRequest = AuthorizedRequest.fromJson(request);
        } 
        catch(err){
            throw new Error('PostStatusRequest error: ' + err);
        }

        let deseralizedRequest = new PostStatusRequest(authorizedRequest.token, request.post);
        return deseralizedRequest;
    }
}
class PagedRequest<T> extends AuthorizedRequest{

    username: string;
    limit: number;
    lastItem: T | null;

    constructor(token: AuthToken, username: string, limit: number, lastItem: T | null){
        super(token);
        this.username = username;
        this.limit = limit;
        this.lastItem = lastItem;
    }
}
export class FollowListRequest extends PagedRequest<User>{

    constructor(token: AuthToken, username: string, limit: number, lastUser: User | null){
        super(token, username, limit, lastUser);
    }

    static fromJson (request: FollowListRequest){
        let authorizedRequest: AuthorizedRequest;
        try{
            authorizedRequest = AuthorizedRequest.fromJson(request);
        } 
        catch(err){
            throw new Error('FollowListRequest error: ' + err);
        }
        let lastFollowUser: User | null = null;
        // JSON.stringify will create the string 'null' if a value is null, which will then cause
        // an error when deserializing.
        if(request.lastItem != null){
            lastFollowUser = User.fromJson(JSON.stringify(request.lastItem));
            if(lastFollowUser == null) throw new Error('FollowListRequest, could not deserialize lastFollowUser with json:\n' + JSON.stringify(request.lastItem));
        }

        let deseralizedRequest = new FollowListRequest(authorizedRequest.token, request.username, request.limit, lastFollowUser);
        return deseralizedRequest;
    }
}
export class StoryFeedRequest extends PagedRequest<Status>{

    constructor(token: AuthToken, username: string, limit: number, lastStatus: Status | null){
        super(token, username, limit, lastStatus);
    }

    static fromJson (request: StoryFeedRequest){
        let authorizedRequest: AuthorizedRequest;
        try{
            authorizedRequest = AuthorizedRequest.fromJson(request);
        } 
        catch(err){
            throw new Error('StatusListRequest error: ' + err);
        }

        // JSON.stringify will create the string 'null' if a value is null, which will then cause
        // an error when deserializing.
        let deserializedLastStatus: Status | null = null;
        if(request.lastItem != null) {
            deserializedLastStatus = Status.fromJson(JSON.stringify(request.lastItem));
            if(deserializedLastStatus == null) throw new Error('StoryFeedRequest, could not deserialize lastStatus with json:\n' + JSON.stringify(request.lastItem));

        }
        let deseralizedRequest = new StoryFeedRequest(authorizedRequest.token, request.username, request.limit, deserializedLastStatus);
        return deseralizedRequest;
    }
}