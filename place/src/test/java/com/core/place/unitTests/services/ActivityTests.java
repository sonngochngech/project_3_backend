//package com.core.place.unitTests.services;
//
//import com.core.place.entities.Activity;
//import com.core.place.entities.Location;
//import com.core.place.entities.Term;
//import com.core.place.services.ActivityService;
//import org.junit.jupiter.api.BeforeEach;
//
//import java.util.*;
//
//public class ActivityTests {
//
//
//    private ActivityService activityService;
//
//    private List<Activity>  activities=new ArrayList<>();
//
//    @BeforeEach
//    public void setUp() {
//
//        Term term1 = Term.builder()
//                .id((long) 1)
//                .name("MORNING")
//                .build();
//        Term term2 = Term.builder().id((long) 2)
//                .name("AFTERNOON")
//                .build();
//        Term term3 = Term.builder()
//                .id((long) 3)
//                .name("EVENING")
//                .build();
//        List<String> types= Arrays.asList("Nature","History_Culture","Foodie","NightLife","Shopping");
//        List<Term> termsList = Arrays.asList(term1, term2, term3);
//        this.activityService = new ActivityService();
//
//        for (int i = 1; i <= 10; i++) {
//            Location location = Location.builder()
//                    .id((long) i)
//                    .latitude((double) i + 1)
//                    .longitude((double) i)
//                    .build();
//            Activity activity = Activity.builder()
//                    .id((long) i)
//                    .terms(Set.of(termsList.get(i % 3),termsList.get((i+1) % 3)))
//                    .type(types.get(i%5))
//                    .location(location)
//                    .Duration(4)
//                    .price(i % 2 == 0 ? 4 : 2)
//                    .build();
//            activities.add(activity);
//        }
//
//        Activity act12 = Activity.builder()
//                .id((long) 11)
//                .terms(Collections.singleton(termsList.get(2)))
//                .type(types.get(0))
//                .Duration(4)
//                .price(2)
//                .build();
//        Activity act13 = Activity.builder()
//                .id((long) 12)
//                .type(types.get(1))
//                .terms(Collections.singleton(termsList.get(2)))
//                .Duration(4)
//                .price(2)
//                .build();
//        Activity act14 = Activity.builder()
//                .id((long) 13)
//                .type(types.get(1))
//                .terms(Collections.singleton(termsList.get(2)))
//                .Duration(4)
//                .price(2)
//                .build();
//        activities.add(act13);
//        activities.add(act14);
//        activities.add(act12);
//    }
//
//
////    @Test
////    public void testFindSpecificActivities() {
////         for (int i = 1; i <= 10; i++) {
////            Activity activity = Activity.builder()
////                    .id((long) i)
////                    .name("activity" + i)
////                    .type("type" + i)
////                    .terms(null)
////                    .Duration(i % 2 == 0 ? 2 : 4)
////                    .price(i % 2 == 0 ? 1 : 2)
////                    .location(null)
////                    .build();
////            this.activities.add(activity);
////        }
////        List<Activity> res= new ArrayList<>();
////        List<Activity> result = activityService.findSpecificActivities(res, activities, 6, 5,0,0);
////        System.out.println(result);
////    }
//
////    @Test
////    public void testMatrix(){
////        Map<Pair<Integer,Integer>,Double> matrix =activityService.getDistanceMatrix(activities);
////        System.out.println(matrix);
////
////    }
////    @Test
////    public void testfindPair(){
////        List<Activity> activities1 = new ArrayList<>(Arrays.asList(activities.get(0), activities.get(1)));
////        List<Activity> activities2 = new ArrayList<>(Collections.singletonList(activities.get(2)));
////        Map<Pair<Integer,Integer>,Double> matrix =activityService.getDistanceMatrix(activities);
////        Pair<Activity,Activity> pair = activityService.findPair(activities1, activities2, matrix);
////        System.out.println(pair);
////        assert activities1.size()==1;
////        assert activities2.isEmpty();
////
////
////    }
//
////    @Test
////    public void testMatchActivities(){
////        List<Activity> activities1= new ArrayList<>(Arrays.asList(activities.get(0), activities.get(1)));
////        List<Activity> activities2= new ArrayList<>(Arrays.asList(activities.get(3), activities.get(4)));
////        List<Activity> activities3= new ArrayList<>(Arrays.asList(activities.get(7), activities.get(9)));
////        List<Activity> entireActivities= new ArrayList<>();
////        entireActivities.addAll(activities1);
////        entireActivities.addAll(activities2);
////        entireActivities.addAll(activities3);
////        List<List<String>> terms = new ArrayList<>(
////                Arrays.asList(
////                        Arrays.asList("AFTERNOON", "EVENING"),
////                        Arrays.asList("MORNING", "AFTERNOON","EVENING"),
////                        Arrays.asList("MORNING","AFTERNOON","EVENING"),
////                        Arrays.asList("MORNING", "AFTERNOON")
////                )
////        );
////        Map<Pair<Integer,Integer>,Double> matrix =activityService.getDistanceMatrix(entireActivities);
////        List<List<Activity>> result = activityService.matchActivitiesToDay(entireActivities, terms, matrix);
////
////        result.forEach(acts-> {
////            acts.forEach(System.out::println);
////            System.out.println();
////
////        });
////        assert activities1.isEmpty();
////        assert activities2.isEmpty();
////        assert activities3.isEmpty();
////
////
////    }
//
////    @Test
////    public void  findSpecificActivitiesByType(){
////        List<String> userTypes= Arrays.asList("Nature","Shopping");
////        Map<Activity,Double> scores=activityService.rankingPlaces(activities,userTypes);
////        List<Activity> act1= activityService.findActivitiesByType(activities, PlaceConfig.Term.MORNING.toString(),3, 5, scores);
////        List<Activity> act2= activityService.findActivitiesByType(activities, PlaceConfig.Term.AFTERNOON.toString(), 4,20,scores);
////        List<Activity> act3=activityService.findActivitiesByType(activities, PlaceConfig.Term.EVENING.toString(), 3, 20,scores);
////        System.out.println("hello");
////        System.out.println("MORNING");
////        act1.forEach(System.out::println);
////        System.out.println("AFTERNOON");
////        act2.forEach(System.out::println);
////        System.out.println("EVENING");
////        act3.forEach(System.out::println);
////
////    }
//}
