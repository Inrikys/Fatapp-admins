import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminAccessGuard } from './guards/admin-access.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'privacy-policy', loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule' },
  {
    path: 'admin',
    canActivate: [AdminAccessGuard],
    children: [
      { path: 'user-register', loadChildren: './pages/user-register/user-register.module#UserRegisterPageModule' },
      { path: 'access-control', loadChildren: './pages/access-control/access-control.module#AccessControlPageModule' },
      { path: 'room', loadChildren: './pages/room/room.module#RoomPageModule' },
      { path: 'calendar-of-events', loadChildren: './pages/calendar-of-events/calendar-of-events.module#CalendarOfEventsPageModule' },
      { path: 'present-list', loadChildren: './pages/present-list/present-list.module#PresentListPageModule' },
      { path: 'edit-room', loadChildren: './pages/edit-room/edit-room.module#EditRoomPageModule' },
      { path: 'qr-code', loadChildren: './pages/room/qr-code/qr-code.module#QrCodePageModule' },
      { path: 'register-event', loadChildren: './pages/register-event/register-event.module#RegisterEventPageModule' },
      { path: 'edit-event', loadChildren: './pages/edit-event/edit-event.module#EditEventPageModule' },
      { path: 'register-speaker', loadChildren: './pages/register-speaker/register-speaker.module#RegisterSpeakerPageModule' },
      { path: 'register-activity', loadChildren: './pages/register-activity/register-activity.module#RegisterActivityPageModule' },
      { path: 'register-course', loadChildren: './pages/register-course/register-course.module#RegisterCoursePageModule' },
      { path: 'edit-speaker', loadChildren: './pages/edit-speaker/edit-speaker.module#EditSpeakerPageModule' },
      { path: 'activities', loadChildren: './pages/activities/activities.module#ActivitiesPageModule' },
      { path: 'edit-activity', loadChildren: './pages/edit-activity/edit-activity.module#EditActivityPageModule' },
      { path: 'activity-student', loadChildren: './pages/activity-student/activity-student.module#ActivityStudentPageModule' },
    ]
  },









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
