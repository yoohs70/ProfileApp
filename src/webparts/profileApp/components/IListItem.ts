import {IEducationItem} from './IEducationItem';
import {IExperienceItem} from './IExperienceItem';
import {ISkillsItem} from './ISkillsItem';
import {IProjectItem} from './IProjectItem';

export interface IListItem{
    Title: string;
    EmployeeId: string;
    Experience: string;
    Location: string;
    PhoneNumber: string;
    Email: string;
    Address: string;
    Summary: string;
    Modified: string;

    EducationItem: IEducationItem[];
    ExperienceItem: IExperienceItem[];

    ProfileImage: string;

    SkillsItem: ISkillsItem[];
    ProjectItem: IProjectItem[];
    
}