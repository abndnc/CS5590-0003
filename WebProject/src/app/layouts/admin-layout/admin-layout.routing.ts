import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {CoursesComponent} from '../../courses/courses.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {AttendanceComponent} from '../../attendance/attendance.component';
import {ProjectsComponent} from '../../projects/projects.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',   component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'courses',  component: CoursesComponent },
    { path: 'attendance',  component: AttendanceComponent },
    { path: 'projects',  component: ProjectsComponent },

];
