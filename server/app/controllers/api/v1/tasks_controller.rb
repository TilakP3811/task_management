module Api
  module V1
    class TasksController < ApplicationController
      before_action :set_task, only: %i[update destroy]

      def index
        render json: {
          tasks: Task.ordered(params[:page]),
          total_pages: number_of_pages(Task.count)
        }, status: :ok
      end

      def create
        task = Task.new(task_params)

        if task.save
          render json: {
            tasks: Task.ordered(params[:page]),
            total_pages: number_of_pages(Task.count)
          }, status: :created
        else
          render json: { error: task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @task.update(task_params)
          render json: Task.ordered(params[:page]), status: :ok
        else
          render json: { error: task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @task.destroy

        render json: {
                 message: 'Task deleted successfully',
                 tasks: Task.ordered(params[:page]),
                 total_pages: number_of_pages(Task.count)
               },
               status: :ok
      end

      private

      def number_of_pages(tasks)
        (tasks / Task::PER_PAGE.to_f).ceil
      end

      def set_task
        @task = Task.find(params[:id])
      end

      def task_params
        params.require(:task).permit(:title, :description, :status)
      end
    end
  end
end
